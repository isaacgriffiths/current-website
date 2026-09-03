import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawn } from "node:child_process";

const BROWSER =
  process.env.BROWSER_BIN ?? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const DEBUG_PORT = 9334;
const PAGE_URL = process.argv[2] ?? "http://localhost:3000/";
const contactUrl = new URL(PAGE_URL);
contactUrl.hash = "contact";
const profile = mkdtempSync(join(tmpdir(), "portfolio-contact-fallback-"));
const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const browser = spawn(
  BROWSER,
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

async function getTarget() {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/list`);
      const targets = await response.json();
      const page = targets.find((target) => target.type === "page");
      if (page) return page;
    } catch {
      // The browser may take a moment to expose its debugging endpoint.
    }
    await delay(100);
  }
  throw new Error("Browser DevTools target was not available");
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
  await send("Network.enable");
  await send("Network.setBlockedURLs", {
    urls: ["*/_next/static/chunks/*.js*"],
  });
  await send("Page.navigate", { url: contactUrl.href });
  await delay(1_500);

  const evaluation = await send("Runtime.evaluate", {
    expression: `(() => {
      const isVisible = (element) => {
        if (!element) return false;
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
      };
      const aboutLink = document.querySelector('nav a[href="#about"]');
      const contactLink = document.querySelector('nav a[href="#contact"]');
      const aboutLabel = aboutLink?.querySelector('span:last-child');
      const contactLabel = contactLink?.querySelector('span:last-child');
      const fallbackSelect = document.querySelector('select[name="intent"]');
      const customButton = document.querySelector('button[aria-haspopup="listbox"]');

      return {
        hash: window.location.hash,
        aboutColor: aboutLabel ? getComputedStyle(aboutLabel).color : null,
        contactColor: contactLabel ? getComputedStyle(contactLabel).color : null,
        fallbackSelectVisible: isVisible(fallbackSelect),
        fallbackOptionCount: fallbackSelect?.options.length ?? 0,
        customButtonVisible: isVisible(customButton),
      };
    })()`,
    returnByValue: true,
  });

  const observed = evaluation.result.value;
  console.log(JSON.stringify(observed));

  const contactLooksActive =
    observed.contactColor !== null && observed.contactColor !== observed.aboutColor;
  if (
    observed.hash !== "#contact" ||
    !contactLooksActive ||
    !observed.fallbackSelectVisible ||
    observed.fallbackOptionCount !== 4 ||
    observed.customButtonVisible
  ) {
    throw new Error(`Contact fallback check failed: ${JSON.stringify(observed)}`);
  }

  console.log("PASS: contact navigation and intent selection work without client JavaScript");
  await send("Browser.close");
} finally {
  socket?.close();
  if (browser.exitCode === null) browser.kill();
  for (let attempt = 0; attempt < 20 && browser.exitCode === null; attempt += 1) {
    await delay(100);
  }
  rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}
