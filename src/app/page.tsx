/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import { Flex } from "antd";
import DarkModeToggle from "./components/dark-mode/DarkModeToggle";
import ArrowIcon from "@/../public/icons/icon_arrow__up-right.svg";

const Homepage = () => {
  const router = useRouter();
  return (
    <div className="relative w-screen h-dvh bg-background-primary">
      <div className="absolute right-4 top-4 bg-background-primary">
        <DarkModeToggle />
      </div>
      <div className="h-full w-full pt-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-text-primary text-nowrap leading-snug font-semibold text-center ">
          Unlock the future with Lucy AI
        </h1>
        <div className="mt-32">
          <Flex justify="center" gap={16}>
            <Flex
              justify="center"
              align="center"
              className="w-[280px] h-[208px] bg-background-primary rounded-xl border-2 border-border cursor-pointer"
              onClick={() => router.push("/virtual-assistant")}
            >
              <div className="w-[270px] h-[198px] p-4 bg-gradient-to-tr from-background-secondary to-gray-200 dark:to-gray-800 rounded-lg hover:from-background-primary hover:to-gray-200 hover:dark:to-gray-800 transition-all">
                <div className="overflow-hidden w-14 h-14 rounded-lg inline-block">
                  <img
                    src="data:image/jpeg;base64,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"
                    alt="AI Technology"
                    width={60}
                  />
                </div>
                <Flex align="center" gap={2}>
                  <p className="text-lg font-medium">AI Assistant</p>
                  <ArrowIcon className="-translate-y-1" />
                </Flex>
                <p className="text-text-secondary text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
                  necessitatibus soluta nisi est esse libero porro reiciendis.
                </p>
              </div>
            </Flex>
            <Flex
              justify="center"
              align="center"
              className="w-[280px] h-[208px] bg-background-primary rounded-xl border-2 border-border cursor-pointer select-none"
            >
              <div className="relative w-[270px] h-[198px] p-4 bg-gradient-to-tr from-background-secondary to-gray-200 dark:to-gray-800 rounded-lg hover:from-background-primary hover:to-gray-200 hover:dark:to-gray-800 transition-all">
                <div className="overflow-hidden w-14 h-14 rounded-lg inline-block">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtUy6dgZ6t9xQ8_0aPlPrYAkEfudd85K28YyUAGkO0ByaMvTfocybUB-Cejh7PsGw8xew&usqp=CAU"
                    alt="AI Technology"
                    width={60}
                  />
                </div>
                <Flex align="center" gap={2}>
                  <p className="text-lg font-medium">Image Proccessing</p>
                  <ArrowIcon className="-translate-y-1" />
                </Flex>
                <p className="text-text-secondary text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
                  necessitatibus soluta nisi est esse libero porro reiciendis.
                </p>
                <Flex
                  justify="center"
                  align="center"
                  className="absolute rounded-xl w-full h-full left-0 top-0 bg-black/15 dark:bg-black/40 cursor-default backdrop-blur-sm"
                >
                  <p className="font-medium text-lg">Comming soon</p>
                </Flex>
              </div>
            </Flex>
            <Flex
              justify="center"
              align="center"
              className="w-[280px] h-[208px] bg-background-primary rounded-xl border-2 border-border cursor-pointer select-none"
            >
              <div className="relative w-[270px] h-[198px] p-4 bg-gradient-to-tr from-background-secondary to-gray-200 dark:to-gray-800 rounded-lg hover:from-background-primary hover:to-gray-200 hover:dark:to-gray-800 transition-all">
                <div className="overflow-hidden w-14 h-14 rounded-lg inline-block">
                  <img
                    src="https://img.freepik.com/free-vector/robotic-artificial-intelligence-technology-smart-lerning-from-bigdata_1150-48136.jpg"
                    alt="AI Technology"
                    width={60}
                  />
                </div>
                <Flex align="center" gap={2}>
                  <p className="text-lg font-medium">Generatic AI</p>
                  <ArrowIcon className="-translate-y-1" />
                </Flex>
                <p className="text-text-secondary text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
                  necessitatibus soluta nisi est esse libero porro reiciendis.
                </p>
                <Flex
                  justify="center"
                  align="center"
                  className="absolute rounded-xl w-full h-full left-0 top-0 bg-black/15 dark:bg-black/40 cursor-default backdrop-blur-sm"
                >
                  <p className="font-medium text-lg">Comming soon</p>
                </Flex>
              </div>
            </Flex>
          </Flex>
        </div>
      </div>
    </div>
  );
};
export default Homepage;
