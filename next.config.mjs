import { env } from "./src/env/server.mjs";
import { withSuperjson } from "next-superjson";

import nextI18Config from "./next-i18next.config.js";

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return withSuperjson()(config);
}

// tailwind.config.js
// module.exports = {
//   // ...
//   plugins: [
//     // ...
//     require("@tailwindcss/forms"),
//   ],
// };

export default defineNextConfig({
  i18n: nextI18Config.i18n,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "tailwindui.com",
      "images.unsplash.com",
      "placeimg.com",
      "lh3.googleusercontent.com",
      "www.gravatar.com",
    ],
  },
});
