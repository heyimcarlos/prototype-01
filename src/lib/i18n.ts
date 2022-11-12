import { IncomingMessage } from "http";
import parser from "accept-language-parser";
import { Maybe } from "@trpc/server";
const { i18 } = require("../../next-i18next.config");

export function getLocaleFromHeaders(req: IncomingMessage): string {
  let preferredLocale: string | null | undefined;
  if (req.headers["accept-language"]) {
    preferredLocale = parser.pick(
      i18.locales,
      req.headers["accept-language"]
    ) as Maybe<string>;
  }
  return preferredLocale ?? i18.defaultLocale;
}
