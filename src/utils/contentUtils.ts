import type { PortableText } from "@/typings/schema-types";

import { GLOBAL_CONFIG } from "./global.config";

export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

export const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export function getSkipValue(page: number) {
  const skipMultiplier = page === 1 ? 0 : page - 1;
  return skipMultiplier > 0
    ? GLOBAL_CONFIG.pagination.pageSize * skipMultiplier
    : 0;
}

export function truncate(
  str: string,
  length = GLOBAL_CONFIG.trimmedHeaderLength
) {
  let i;
  const bits = str.split("");
  if (bits.length > length) {
    for (i = bits.length - 1; i > -1; i -= 1) {
      if (i > length) {
        bits.length = i;
      } else if (bits[i] === " ") {
        bits.length = i;
        break;
      }
    }
    bits.push("...");
  }
  return bits.join("");
}

export function getActiveStatus(href: string, currentPath: string): boolean {
  if (href === currentPath) {
    return true;
  }
  if (
    href.search("categories") > 0 &&
    (currentPath.search("model") > 0 || currentPath.search("tag") > 0)
  ) {
    return true;
  }
  if (href.search("product") > 0 && currentPath.search("product") > 0) {
    return true;
  }

  return false;
}

export function toPlainText(blocks: PortableText) {
  return (
    blocks
      // loop through each block
      .map((block) => {
        // if it's not a text block with children,
        // return nothing
        // eslint-disable-next-line no-underscore-dangle
        if (block._type !== "block" || !block.children) {
          return "";
        }
        // loop through the children spans, and join the
        // text strings
        return block.children.map((child: any) => child.text).join("");
      })
      // join the paragraphs leaving split by two linebreaks
      .join("\n\n")
  );
}

export function getDescription(pt: PortableText): string {
  return truncate(toPlainText(pt), 256);
}
