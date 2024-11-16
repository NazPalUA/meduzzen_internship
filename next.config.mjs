import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./src/shared/i18n/request.ts")

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "51.20.210.187",
      },
    ],
  },
}

export default withNextIntl(nextConfig)
