import type { NextConfig } from "next";

const isGitHubPagesBuild = process.env.GITHUB_PAGES_BUILD === "true";
const configuredBasePath = process.env.PAGES_BASE_PATH ?? "";
const basePath =
  isGitHubPagesBuild && configuredBasePath !== "/"
    ? configuredBasePath.replace(/\/$/, "")
    : "";
const repositoryOwner = process.env.GITHUB_REPOSITORY_OWNER;
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (isGitHubPagesBuild && repositoryOwner
    ? `https://${repositoryOwner}.github.io${basePath}`
    : "http://localhost:3000");

const nextConfig: NextConfig = {
  ...(isGitHubPagesBuild
    ? {
        output: "export" as const,
        trailingSlash: true,
        basePath,
        images: { unoptimized: true },
      }
    : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_URL: siteUrl,
  },
};

export default nextConfig;
