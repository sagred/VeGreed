import { Header } from "components/header";

import { Button } from "components/ui/button";
import Link from "next/link";
import React from "react";
import { RoughNotation } from "react-rough-notation";

const Main = () => {
  return (
    <main className="bg-white dark:bg-black">
      <Header />
      <div className="flex bg-dotted-spacing-4 bg-dotted-[#242424]  flex-col items-center justify-center h-screen">
        <div className="group relative m-2 rounded-sm opacity-100">
          <div className={`absolute -inset-1  opacity-100  blur-3xl`}>
            <h1 className={`text-8xl max-w-5xl text-center font-black mb-6`}>
              <span className="bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
                Register your company to reward your users loyalty
              </span>
            </h1>
          </div>
          <div className="items-top relative flex justify-start leading-none">
            <div className="flex items-center justify-center ">
              <h1 className={`text-8xl max-w-5xl text-center font-black mb-6`}>
                <span className="bg-gradient-to-r bg-clip-text text-transparent">
                  <RoughNotation
                    animationDuration={1000}
                    type="highlight"
                    color="white"
                    show={true}
                  >
                    <span className="text-black">Greed</span>
                  </RoughNotation>{" "}
                  <div>
                    <span className="bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
                      {" "}
                      is good
                    </span>
                  </div>
                </span>
              </h1>
            </div>
          </div>
        </div>
        <Link href={"/subscriber"}>
          <Button className="mt-10" variant="default">
            {" "}
            Get Started
          </Button>
        </Link>

        <h3 className="mt-4 opacity-75 font-light">
          If you are a provider,{" "}
          <span className="underline cursor-pointer">
            {" "}
            <Link href={"/provider"}>Register here</Link>
          </span>{" "}
        </h3>
      </div>
    </main>
  );
};

export default Main;
