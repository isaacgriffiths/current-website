"use client";

import ArrowLink from "./ArrowLink";

export const CV_REQUEST_INTENT = "A copy of my CV";
export const CONTACT_INTENT_EVENT = "contact:intent";

export default function CvRequestLink() {
  return (
    <ArrowLink
      href="#contact"
      label="Get my CV by email: one form, sent straight away"
      className="text-base font-semibold"
      onClick={() => {
        window.dispatchEvent(
          new CustomEvent(CONTACT_INTENT_EVENT, { detail: CV_REQUEST_INTENT }),
        );
      }}
    >
      Get my CV by email
    </ArrowLink>
  );
}
