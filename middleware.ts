import createMiddleware from "next-intl/middleware"
import { routing } from "./src/shared/i18n/routing"

export default createMiddleware(routing)

export const config = {
	// Match only internationalized pathnames
	matcher: ["/", "/(ua|en)/:path*"],
}
