import { env } from "./src/env/server.mjs";
import { withSuperjson } from "next-superjson";
import * as All from "@tailwindcss/forms";
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
  reactStrictMode: true,
  swcMinify: true,
  images: { domains: ["tailwindui.com", "images.unsplash.com"] },
});
