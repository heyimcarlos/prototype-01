/* eslint-disable @typescript-eslint/no-var-requires */
import type { IncomingMessage } from "http";
import parser from "accept-language-parser";
import type { Maybe } from "@trpc/server";
import nextI18Config from "../../next-i18next.config";

export function getLocaleFromHeaders(req: IncomingMessage): string {
  let preferredLocale: string | null | undefined;
  if (req.headers["accept-language"]) {
    preferredLocale = parser.pick(
      nextI18Config.i18n.locales,
      req.headers["accept-language"]
    ) as Maybe<string>;
  }
  return preferredLocale ?? nextI18Config.i18n.defaultLocale;
}
