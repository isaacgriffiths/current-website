"use client";

import ArrowLink from "./ArrowLink";

export const CV_REQUEST_INTENT = "A copy of my CV";
export const CONTACT_INTENT_EVENT = "contact:intent";

export default function CvRequestLink() {
  return (
    <ArrowLink
      href="#contact"
      label="Request my CV and receive it by email"
      className="text-base font-semibold"
      onClick={() => {
        window.dispatchEvent(
          new CustomEvent(CONTACT_INTENT_EVENT, { detail: CV_REQUEST_INTENT }),
        );
      }}
    >
      Request my CV
    </ArrowLink>
  );
}
