import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-md">
        {/* Header */}
        <div className="bg-gradient-to-r from-customTeal to-customDarkBlue p-6">
          <h1 className="text-2xl font-bold text-white text-center">
            Create Your Account
          </h1>
          <p className="text-sm text-white/80 text-center mt-2">
            Join us to get started
          </p>
        </div>

        {/* Clerk Sign-Up Component */}
        <div className="p-6">
          <SignUp
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none w-full",
                headerTitle: "text-lg font-semibold",
                headerSubtitle: "text-sm text-gray-600",
                formFieldInput:
                  "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customTeal",
                formButtonPrimary:
                  "w-full bg-customTeal hover:bg-customDarkBlue text-white font-semibold py-2 px-4 rounded-lg transition duration-200",
                footerActionText: "text-sm text-gray-600",
                footerActionLink: "text-customDarkBlue hover:underline",
              },
            }}
          />
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-6 text-center border-t">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-customTeal hover:underline font-semibold"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}