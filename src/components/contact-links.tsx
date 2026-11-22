"use client";

import { useState } from "react";
import { Button } from "./site-controls";

function fallbackCopy(value: string) {
  const input = document.createElement("textarea");
  const previousFocus = document.activeElement;
  input.value = value;
  input.readOnly = true;
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.append(input);

  try {
    input.select();
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    input.remove();
    if (previousFocus instanceof HTMLElement) previousFocus.focus({ preventScroll: true });
  }
}

export function CopyButton({ label, value, failureMessage = "请手动复制后在应用内搜索" }: {
  label: string;
  value: string;
  failureMessage?: string;
}) {
  const [feedback, setFeedback] = useState<"idle" | "copied" | "failed">("idle");

  async function copyValue() {
    setFeedback("idle");
    let copied = false;
    try {
      await navigator.clipboard.writeText(value);
      copied = true;
    } catch {
      copied = fallbackCopy(value);
    }
    setFeedback(copied ? "copied" : "failed");
  }

  return (
    <span>
      <Button
        aria-label={feedback === "copied" ? `${label}，已复制` : label}
        className="copy-button"
        onClick={copyValue}
        type="button"
        variant="text"
      >
        {feedback === "copied" ? "已复制" : "复制"}
      </Button>
      <span className={feedback === "failed" ? "copy-feedback" : "visually-hidden"} role="status">
        {feedback === "copied" && "已复制到剪贴板"}
        {feedback === "failed" && failureMessage}
      </span>
    </span>
  );
}
