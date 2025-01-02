import { ImCross } from "react-icons/im";

export default function StripeError() {
  return (
    <div className="flex flex-col items-center justify-center  py-10">
      <ImCross className="text-3xl font-bold text-red-600 w-12 h-12" />
      <h1 className="font-bold mt-5">Something went wrong....</h1>
    </div>
  );
}
