import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./src/shared/i18n/request.ts")

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined in the environment variables")
}

const url = new URL(process.env.NEXT_PUBLIC_API_URL)

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: url.protocol.replace(":", ""),
        hostname: url.hostname,
      },
    ],
  },
}

export default withNextIntl(nextConfig)
