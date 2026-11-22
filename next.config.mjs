import path from "node:path";
import { fileURLToPath } from "node:url";

const appDirectory = path.dirname(fileURLToPath(import.meta.url));

/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  images: { unoptimized: true },
  turbopack: { root: appDirectory },
};

export default nextConfig;
