const path = require("path");

/** @type {import("next-i18next").UserConfig} */
const config = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
  },
  reloadOnPrerender: process.env.NODE_ENV !== "production",
  localePath: path.resolve("./public/locales"),
};

module.exports = config;
