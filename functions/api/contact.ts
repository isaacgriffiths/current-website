/**
 * Contact endpoint for isaacgriffiths.com.
 *
 * Runs as a Cloudflare Pages Function alongside the static export.
 * Required secrets (Pages project → Settings → Environment variables):
 *   RESEND_API_KEY   – Resend API key
 *   CONTACT_TO       – inbox that receives the message
 *   CONTACT_FROM     – verified Resend sender, e.g. "Site <site@isaacgriffiths.com>"
 * Optional:
 *   TURNSTILE_SECRET_KEY – enables bot verification when set
 */

type Env = {
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
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

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const looksLikeEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );

async function verifyTurnstile(secret: string, token: string, ip: string | null) {
  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  const result = (await res.json()) as { success?: boolean };
  return result.success === true;
}

export const onRequestPost = async (context: {
  request: Request;
  env: Env;
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

  if (!name || !email || !message) {
    return json({ error: "Name, email and message are all needed." }, 400);
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

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM,
      to: [env.CONTACT_TO],
      reply_to: email,
      subject: `isaacgriffiths.com — ${intent} — ${name}`,
      text: `From: ${name} <${email}>\nWanting: ${intent}\n\n${message}`,
      html:
        `<p><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p>` +
        `<p>Wanting: ${escapeHtml(intent)}</p><hr>` +
        `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    }),
  });

  if (!res.ok) {
    return json({ error: "The message could not be sent just now." }, 502);
  }

  return json({ ok: true }, 200);
};
