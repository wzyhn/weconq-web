"use client";

import type { AnchorHTMLAttributes } from "react";
import { Link as TDesignLink, type LinkProps } from "tdesign-react";

// The official Link forwards HTML attributes but omits `rel` from its typings.
// Keep safe external-link attributes without replacing its behavior or visuals.
export function Link(
  props: LinkProps & Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "rel" | "id" | "aria-label">,
) {
  return <TDesignLink {...props} />;
}

export { Button } from "tdesign-react";
