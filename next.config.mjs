import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./src/shared/i18n/request.ts")

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.NEXT_PUBLIC_API_URL?.replace("http://", ""),
      },
    ],
  },
}

export default withNextIntl(nextConfig)
