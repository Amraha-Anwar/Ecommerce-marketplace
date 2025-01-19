import { CheckCheck } from "lucide-react";
import Link from "next/link";

export default function StripeSuccess() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-32 md:max-w-[50vw] mx-auto">
        <CheckCheck className="text-green-600 w-16 h-16 mx-auto my-6" />
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-bold text-center">
            Payment Successful!
          </h3>
          <p className="text-gray-600 my-2">
            Thank you for the shopping We hope you enjoy it
          </p>
          <p>Have a great day!</p>
          <Link href={"/generate-tracking"}>
            <button className="bg-customTeal text-white hover:bg-customTeal/80 px-3 py-2 rounded-md mt-5">
              Generate Tracking Number!{" "}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}