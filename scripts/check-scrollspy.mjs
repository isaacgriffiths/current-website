import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawn } from "node:child_process";

const CHROME =
  process.env.BROWSER_BIN ?? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const DEBUG_PORT = 9333;
const PAGE_URL = process.argv[2] ?? "http://localhost:3000/";
const CONTACT_URL = new URL(PAGE_URL);
CONTACT_URL.hash = "contact";
const profile = mkdtempSync(join(tmpdir(), "portfolio-scrollspy-"));
const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const chrome = spawn(
  CHROME,
  [
    "--headless=new",
    `--remote-debugging-port=${DEBUG_PORT}`,
    `--user-data-dir=${profile}`,
    "--window-size=1255,1405",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    "about:blank",
  ],
  { stdio: "ignore", windowsHide: true },
);

let socket;
const diagnostics = [];

async function getTarget() {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/list`);
      const targets = await response.json();
      const page = targets.find((target) => target.type === "page");
      if (page) return page;
    } catch {
      // Chrome may take a moment to expose its debugging endpoint.
    }

    await delay(100);
  }

  throw new Error("Chrome DevTools target was not available");
}

async function connect() {
  const target = await getTarget();
  socket = new WebSocket(target.webSocketDebuggerUrl);

  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  let nextId = 1;
  const pending = new Map();

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (
      message.method === "Runtime.exceptionThrown" ||
      (message.method === "Log.entryAdded" && message.params?.entry?.level === "error")
    ) {
      diagnostics.push(message);
    }
    const request = pending.get(message.id);
    if (!request) return;

    pending.delete(message.id);
    if (message.error) request.reject(new Error(message.error.message));
    else request.resolve(message.result);
  });

  return (method, params = {}) =>
    new Promise((resolve, reject) => {
      const id = nextId;
      nextId += 1;
      pending.set(id, { resolve, reject });
      socket.send(JSON.stringify({ id, method, params }));
    });
}

try {
  const send = await connect();
  await send("Runtime.enable");
  await send("Log.enable");
  await send("Page.navigate", { url: CONTACT_URL.href });
  await delay(1_500);

  const contactEvaluation = await send("Runtime.evaluate", {
    expression: `new Promise(async (resolve) => {
      const wait = (milliseconds) => new Promise((done) => setTimeout(done, milliseconds));
      const activeOnHashLoad = document.querySelector('nav a[aria-current="true"]')?.getAttribute("href")?.slice(1) ?? null;
      const intentButton = document.querySelector('button[aria-haspopup="listbox"]');
      intentButton?.click();
      await wait(150);
      const listbox = document.querySelector('[role="listbox"]');
      const listboxStyle = listbox ? getComputedStyle(listbox) : null;
      const listboxRect = listbox?.getBoundingClientRect();

      resolve({
        activeOnHashLoad,
        hash: window.location.hash,
        contactTop: document.getElementById("contact")?.getBoundingClientRect().top ?? null,
        dropdown: {
          expanded: intentButton?.getAttribute("aria-expanded") ?? null,
          exists: Boolean(listbox),
          visible: Boolean(
            listbox &&
            listboxStyle?.display !== "none" &&
            listboxStyle?.visibility !== "hidden" &&
            Number(listboxRect?.width) > 0 &&
            Number(listboxRect?.height) > 0
          ),
          optionCount: listbox?.querySelectorAll('[role="option"]').length ?? 0,
        },
      });
    })`,
    awaitPromise: true,
    returnByValue: true,
  });
  const contactObserved = contactEvaluation.result.value;

  await send("Page.navigate", { url: PAGE_URL });
  await delay(1_500);

  const windowObject = await send("Runtime.evaluate", { expression: "window" });
  const windowListeners = await send("DOMDebugger.getEventListeners", {
    objectId: windowObject.result.objectId,
  });
  const scrollListenerCount = windowListeners.listeners.filter(
    (listener) => listener.type === "scroll",
  ).length;

  const evaluation = await send("Runtime.evaluate", {
    expression: `new Promise(async (resolve) => {
      const wait = (milliseconds) => new Promise((done) => setTimeout(done, milliseconds));
      const ids = [...document.querySelectorAll('nav a[href^="#"]')]
        .map((link) => link.getAttribute("href")?.slice(1))
        .filter(Boolean);
      const observations = [];

      for (const id of ids) {
        const section = document.getElementById(id);
        const isFinalSection = id === ids.at(-1);
        const target = isFinalSection
          ? document.documentElement.scrollHeight
          : section.offsetTop - window.innerHeight * 0.2;

        window.scrollTo({ top: target, behavior: "instant" });
        await wait(250);
        observations.push({
          expected: id,
          active: document.querySelector('nav a[aria-current="true"]')?.getAttribute("href")?.slice(1) ?? null,
          sectionTop: section.getBoundingClientRect().top,
          scrollY: window.scrollY,
        });
      }

      document.querySelector('a[aria-label="Request my CV and receive it by email"]')?.click();
      await wait(250);

      const cvRequest = {
        hash: window.location.hash,
        intent: document.querySelector('[name="intent"]')?.value ?? null,
        messageRequired: document.querySelector('textarea[name="message"]')?.required ?? null,
        contactTop: document.getElementById("contact")?.getBoundingClientRect().top ?? null,
      };

      const gskLinks = [...document.querySelectorAll('a[href="https://www.gsk.com/"]')]
        .map((link) => link.textContent?.trim())
        .filter(Boolean);

      resolve({ observations, scrollListenerCount: ${scrollListenerCount}, cvRequest, gskLinks });
    })`,
    awaitPromise: true,
    returnByValue: true,
  });

  const observed = evaluation.result.value;
  console.log(JSON.stringify({ contactObserved, ...observed }));

  const failures = observed.observations.filter(
    ({ expected, active }) => expected !== active,
  );
  const cvRequestFailed =
    observed.cvRequest.hash !== "#contact" ||
    observed.cvRequest.intent !== "A copy of my CV" ||
    observed.cvRequest.messageRequired !== null ||
    observed.cvRequest.contactTop === null;
  const gskLinksFailed = observed.gskLinks.length !== 3;
  const contactHashFailed =
    contactObserved.hash !== "#contact" || contactObserved.activeOnHashLoad !== "contact";
  const dropdownFailed =
    contactObserved.dropdown.expanded !== "true" ||
    !contactObserved.dropdown.exists ||
    !contactObserved.dropdown.visible ||
    contactObserved.dropdown.optionCount !== 4;

  if (
    scrollListenerCount === 0 ||
    failures.length > 0 ||
    cvRequestFailed ||
    gskLinksFailed ||
    contactHashFailed ||
    dropdownFailed ||
    diagnostics.length > 0
  ) {
    throw new Error(
      `Interaction check failed: ${JSON.stringify({ contactObserved, failures, scrollListenerCount, cvRequest: observed.cvRequest, gskLinks: observed.gskLinks, diagnostics })}`,
    );
  }

  console.log("PASS: hash navigation, dropdown, section navigation, CV prefill, and GSK links work");
  await send("Browser.close");
} finally {
  socket?.close();
  if (chrome.exitCode === null) chrome.kill();
  for (let attempt = 0; attempt < 20 && chrome.exitCode === null; attempt += 1) {
    await delay(100);
  }
  rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}
