/**
 * Contact endpoint for isaacgriffiths.com.
 *
 * Runs as a Cloudflare Pages Function alongside the static export.
 * Required secrets (Pages project -> Settings -> Environment variables):
 *   RESEND_API_KEY - Resend API key
 *   CONTACT_TO     - inbox that receives the message
 *   CONTACT_FROM   - verified Resend sender, e.g. "Isaac <hello@isaacgriffiths.com>"
 * Required binding:
 *   CV_BUCKET - private R2 bucket containing the current CV
 * Optional:
 *   TURNSTILE_SECRET_KEY - enables bot verification when set
 */

type CvObject = {
  arrayBuffer(): Promise<ArrayBuffer>;
};

type CvBucket = {
  get(key: string): Promise<CvObject | null>;
};

type Env = {
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
  CV_BUCKET?: CvBucket;
  TURNSTILE_SECRET_KEY?: string;
};

type Payload = {
  name?: string;
  email?: string;
  intent?: string;
  message?: string;
  company_website?: string;
  "cf-turnstile-response"?: string;
};

type ResendEmail = {
  from: string;
  to: string[];
  reply_to?: string;
  subject: string;
  text: string;
  html: string;
  attachments?: Array<{ content: string; filename: string }>;
};

const CV_REQUEST_INTENT = "A copy of my CV";
const LEGACY_CV_REQUEST_INTENT = "A copy of your CV";
const CV_OBJECT_KEY = "documents/Isaac-Griffiths-CV-2026-09-v8.pdf";

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const looksLikeEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

const firstNameFrom = (name: string) => {
  const firstName = name.split(/\s+/)[0] || name;
  return firstName.charAt(0).toLocaleUpperCase() + firstName.slice(1);
};

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });

const sendWithResend = (apiKey: string, email: ResendEmail) =>
  fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(email),
  });

const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = "";

  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }

  return btoa(binary);
};

const confirmationHtml = (
  firstName: string,
  intent: string,
  requestedCv: boolean,
  cvAttached: boolean,
) => {
  const safeFirstName = escapeHtml(firstName);
  const safeIntent = escapeHtml(intent);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta name="color-scheme" content="dark">
    <meta name="supported-color-schemes" content="dark">
    <style>
      :root { color-scheme: dark; supported-color-schemes: dark; }
      [data-ogsc] .email-copy { color: #94a3b8 !important; }
      [data-ogsc] .email-bright { color: #e2e8f0 !important; }
      [data-ogsc] .email-accent { color: #00fefe !important; }
    </style>
  </head>
  <body style="margin:0;background-color:#0f172a;color:#94a3b8;font-family:Inter,Arial,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" bgcolor="#0f172a" style="background-color:#0f172a;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" bgcolor="#172033" style="max-width:600px;border:1px solid #334155;border-radius:12px;background-color:#172033;overflow:hidden;">
            <tr>
              <td style="padding:38px 36px 34px;">
                <p class="email-accent" style="margin:0 0 22px;color:#00fefe;font-family:monospace;font-size:12px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;">&#9679;&nbsp; ${requestedCv ? "CV requested" : "Message received"}</p>
                <h1 class="email-bright" style="margin:0 0 20px;color:#e2e8f0;font-size:30px;line-height:1.2;letter-spacing:-0.6px;">Hello ${safeFirstName},</h1>
                ${
                  requestedCv
                    ? `<p class="email-copy" style="margin:0 0 16px;color:#94a3b8;font-size:17px;line-height:1.7;">Thanks for requesting a copy of my CV.</p>
                       <p class="email-copy" style="margin:0;color:#94a3b8;font-size:17px;line-height:1.7;">My latest 2026 CV is attached. It focuses on agentic AI, forward-deployed engineering, and building tools that work in real operations.</p>
                       <div style="margin-top:26px;border-left:3px solid #00fefe;background-color:#0f172a;padding:16px 18px;">
                         <p class="email-bright" style="margin:0;color:#e2e8f0;font-size:16px;line-height:1.6;">${
                           cvAttached
                             ? "The PDF is attached to this email. If a role or project comes to mind, just reply directly."
                             : "I&rsquo;ll send the PDF when I reply."
                         }</p>
                       </div>`
                    : `<p class="email-copy" style="margin:0 0 16px;color:#94a3b8;font-size:17px;line-height:1.7;">Thanks for your email about <strong class="email-bright" style="color:#e2e8f0;">${safeIntent}</strong>. It has landed safely in my inbox.</p>
                       <p class="email-copy" style="margin:0;color:#94a3b8;font-size:17px;line-height:1.7;">I&rsquo;ll review it and get back to you, usually within a day or two.</p>`
                }
              </td>
            </tr>
            <tr>
              <td style="border-top:1px solid #334155;padding:26px 36px 30px;">
                <p class="email-bright" style="margin:0 0 4px;color:#e2e8f0;font-size:16px;font-weight:700;">Isaac Griffiths</p>
                <p class="email-copy" style="margin:0 0 16px;color:#94a3b8;font-size:14px;line-height:1.5;">Agentic engineer, forward deployed</p>
                <a class="email-accent" href="https://isaacgriffiths.com" style="color:#00fefe;font-size:14px;font-weight:600;text-decoration:none;">isaacgriffiths.com&nbsp; &#8599;</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};

async function verifyTurnstile(secret: string, token: string, ip: string | null) {
  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

export const onRequestPost = async (context: {
  request: Request;
  env: Env;
  waitUntil(promise: Promise<unknown>): void;
}): Promise<Response> => {
  const { request, env } = context;

  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return json({ error: "That request was not readable." }, 400);
  }

  // Honeypot: bots fill every field they find.
  if (clean(payload.company_website, 200)) return json({ ok: true }, 200);

  const name = clean(payload.name, 120);
  const email = clean(payload.email, 200);
  const intent = clean(payload.intent, 120) || "Not specified";
  const message = clean(payload.message, 4000);
  const requestedCv = intent === CV_REQUEST_INTENT || intent === LEGACY_CV_REQUEST_INTENT;
  const firstName = firstNameFrom(name);

  const needsMessage = !requestedCv;
  if (!name || !email || (needsMessage && !message)) {
    return json(
      { error: needsMessage ? "Name, email and message are all needed." : "Name and email are needed." },
      400,
    );
  }
  if (!looksLikeEmail(email)) {
    return json({ error: "That email address does not look right." }, 400);
  }

  if (env.TURNSTILE_SECRET_KEY) {
    const token = clean(payload["cf-turnstile-response"], 2048);
    const ok =
      token &&
      (await verifyTurnstile(
        env.TURNSTILE_SECRET_KEY,
        token,
        request.headers.get("cf-connecting-ip"),
      ));
    if (!ok) return json({ error: "Bot check failed. Reload the page and try again." }, 400);
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM) {
    return json({ error: "The contact form is not configured yet." }, 503);
  }

  let cvAttachment: ResendEmail["attachments"];
  if (requestedCv) {
    const cvObject = await env.CV_BUCKET?.get(CV_OBJECT_KEY);
    if (!cvObject) {
      console.error(
        JSON.stringify({
          message: "CV attachment was requested but the R2 object was unavailable",
          key: CV_OBJECT_KEY,
        }),
      );
      return json({ error: "The CV could not be attached just now. Please try again." }, 503);
    }

    cvAttachment = [
      {
        content: arrayBufferToBase64(await cvObject.arrayBuffer()),
        filename: "Isaac-Griffiths-CV-2026.pdf",
      },
    ];
  }

  const sendNotification = () => {
    const notificationMessage = message || "CV requested, no additional message provided.";
    return sendWithResend(env.RESEND_API_KEY!, {
      from: env.CONTACT_FROM!,
      to: [env.CONTACT_TO!],
      reply_to: email,
      subject: `isaacgriffiths.com - ${intent} - ${name}`,
      text: `From: ${name} <${email}>\nWanting: ${intent}\n\n${notificationMessage}`,
      html:
        `<p><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p>` +
        `<p>Wanting: ${escapeHtml(intent)}</p><hr>` +
        `<p style="white-space:pre-wrap">${escapeHtml(notificationMessage)}</p>`,
    });
  };

  const sendConfirmation = () => {
    const confirmationText = requestedCv
      ? [
          `Hello ${firstName},`,
          "",
          "Thanks for requesting a copy of my CV.",
          "My latest 2026 CV is attached. It focuses on agentic AI, forward-deployed engineering, and building tools that work in real operations.",
          "",
          "If a role or project comes to mind, just reply directly to this email.",
          "",
          "Isaac Griffiths",
          "Agentic engineer, forward deployed",
          "https://isaacgriffiths.com",
        ].join("\n")
      : [
          `Hello ${firstName},`,
          "",
          `Thanks for your email about ${intent}. It has landed safely in my inbox.`,
          "I'll review it and get back to you, usually within a day or two.",
          "",
          "Isaac Griffiths",
          "Agentic engineer, forward deployed",
          "https://isaacgriffiths.com",
        ].join("\n");

    return sendWithResend(env.RESEND_API_KEY!, {
      from: env.CONTACT_FROM!,
      to: [email],
      reply_to: "hello@isaacgriffiths.com",
      subject: requestedCv
        ? "CV from Isaac Griffiths"
        : `Thanks for getting in touch, ${firstName}`,
      text: confirmationText,
      html: confirmationHtml(firstName, intent, requestedCv, Boolean(cvAttachment)),
      ...(cvAttachment ? { attachments: cvAttachment } : {}),
    });
  };

  if (requestedCv) {
    const confirmation = await sendConfirmation();
    if (!confirmation.ok) {
      console.error(
        JSON.stringify({
          message: "Resend CV email failed",
          status: confirmation.status,
        }),
      );
      return json({ error: "The CV email could not be sent just now. Please try again." }, 502);
    }

    context.waitUntil(
      sendNotification()
        .then((notification) => {
          if (!notification.ok) {
            console.error(
              JSON.stringify({
                message: "Resend CV request notification failed",
                status: notification.status,
              }),
            );
          }
        })
        .catch((error: unknown) => {
          console.error(
            JSON.stringify({
              message: "Resend CV request notification failed",
              error: error instanceof Error ? error.message : "Unknown error",
            }),
          );
        }),
    );

    return json({ ok: true, kind: "cv" }, 200);
  }

  const notification = await sendNotification();
  if (!notification.ok) {
    console.error(
      JSON.stringify({ message: "Resend contact notification failed", status: notification.status }),
    );
    return json({ error: "The message could not be sent just now." }, 502);
  }

  context.waitUntil(
    sendConfirmation()
      .then((confirmation) => {
        if (!confirmation.ok) {
          console.error(
            JSON.stringify({
              message: "Resend confirmation email failed",
              status: confirmation.status,
            }),
          );
        }
      })
      .catch((error: unknown) => {
        console.error(
          JSON.stringify({
            message: "Resend confirmation email failed",
            error: error instanceof Error ? error.message : "Unknown error",
          }),
        );
      }),
  );

  return json({ ok: true, kind: "message" }, 200);
};
