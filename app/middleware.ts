export { default } from "next-auth/middleware";
// "/api/degrees/:path*"
export const config = { matcher: ["/api/degrees"] };