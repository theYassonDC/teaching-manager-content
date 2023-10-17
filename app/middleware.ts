export { default } from "next-auth/middleware";
// "/api/degrees/:path*"
export const config = { matcher: ["https://teachercontentmanager.netlify.app/dashboard/:path*"] };