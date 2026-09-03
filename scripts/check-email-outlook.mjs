import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../functions/api/contact.ts", import.meta.url), "utf8");
const templateStart = source.indexOf("const confirmationHtml");
const templateEnd = source.indexOf("async function verifyTurnstile", templateStart);

assert.notEqual(templateStart, -1, "confirmationHtml template was not found");
assert.notEqual(templateEnd, -1, "confirmationHtml template boundary was not found");

const template = source.slice(templateStart, templateEnd);
const paragraphTags = [...template.matchAll(/<p\b[^>]*>/g)].map((match) => match[0]);
const paragraphsWithoutInlineColor = paragraphTags.filter(
  (tag) => !/style="[^"]*\bcolor\s*:/i.test(tag),
);

assert.ok(paragraphTags.length > 0, "No email paragraphs were found");
assert.deepEqual(
  paragraphsWithoutInlineColor,
  [],
  `Outlook-safe email paragraphs need an explicit inline color:\n${paragraphsWithoutInlineColor.join("\n")}`,
);

console.log(`Email compatibility check passed (${paragraphTags.length} paragraphs).`);
