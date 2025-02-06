import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/sign-in", "/sign-up"], // Define public routes
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)", // Matches all routes except static files and Next.js internals
    "/(api|trpc)(.*)", // Ensure API routes are included
  ],
};
