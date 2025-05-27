import type { MiddlewareFunction } from "@/shared/types/middleware";
import { NextResponse } from "next/server";

export const roleBasedAccess: MiddlewareFunction = async ({ req, session }) => {
	const pathname = req.nextUrl.pathname;

	if (
		session?.isLoggedIn &&
		session.role &&
		pathname.startsWith("/dashboard")
		// && tabsData[session.role].every((tab) => !pathname.startsWith(tab.href))
	) {
		return NextResponse.redirect(new URL("/dashboard/profile", req.nextUrl));
	}
};
