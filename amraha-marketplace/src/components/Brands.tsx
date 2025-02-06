import Image from "next/image";

export default function Brands() {
  return (
    <>
      <main className="max-w-screen-2xl mx-auto overflow-x-hidden">
        {/* main div which will implement flex to all */}
        <div className="flex justify-between lg:px-28 lg:py-5 items-center">
          <div>
            <Image
              className="w-[70%] h-[70%] lg:w-[100%] lg:h-[100%]"
              src={"/images/brand1.png"}
              alt="Brand 1"
              width={200}
              height={200}
            />
          </div>
          <div>
            {" "}
            <Image
              className="w-[70%] h-[70%] lg:w-[100%] lg:h-[100%]"
              src={"/images/brand2.png"}
              alt="Brand 2"
              width={200}
              height={200}
            />
          </div>
          <div>
            {" "}
            <Image
              className="w-[70%] h-[70%] lg:w-[100%] lg:h-[100%]"
              src={"/images/brand3.png"}
              alt="Brand 3"
              width={200}
              height={200}
            />
          </div>
          <div>
            {" "}
            <Image
              className="w-[70%] h-[70%] lg:w-[100%] lg:h-[50%]"
              src={"/images/brand4.png"}
              alt="Brand 4"
              width={200}
              height={200}
            />
          </div>
          <div>
            {" "}
            <Image
              className="w-[70%] h-[70%] lg:w-[100%] lg:h-[90%]"
              src={"/images/brand5.png"}
              alt="Brand 5"
              width={200}
              height={200}
            />
          </div>
          <div>
            {" "}
            <Image
              className="w-[70%] h-[70%] lg:w-[100%] lg:h-[90%]"
              src={"/images/brand6.png"}
              alt="Brand 6"
              width={200}
              height={200}
            />
          </div>
          <div>
            {" "}
            <Image
              className="w-[70%] h-[70%] lg:w-[100%] lg:h-[80%]"
              src={"/images/brand7.png"}
              alt="Brand 7"
              width={200}
              height={200}
            />
          </div>
        </div>
      </main>
    </>
  );
}
