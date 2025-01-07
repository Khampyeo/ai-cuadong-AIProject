/* eslint-disable @next/next/no-img-element */
"use client";

import { Flex } from "antd";
import DarkModeToggle from "./components/dark-mode/DarkModeToggle";
import FeatureItem from "./components/features/FeatureItem";

const Homepage = () => {
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
          <Flex justify="center" wrap={"wrap"} gap={16}>
            <FeatureItem
              name={"Pig Detection"}
              description={
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum necessitatibus soluta nisi est esse libero porro reiciendis."
              }
              img={
                "https://stmaaprodfwsite.blob.core.windows.net/assets/sites/1/2020/12/121220_Facial-Recognition_AdobeStock_2747487_F_C_Illistration-by-FW-image-from-Adobe-Stock.jpg"
              }
              link={"/pig-detection"}
            />
            <FeatureItem
              name={"AI Assistant"}
              description={
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum necessitatibus soluta nisi est esse libero porro reiciendis."
              }
              img={
                "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/8c9d0b8e-4ed4-4fee-9f77-e54b9d9a6f66/a440c3e4-0ea3-421e-a45b-bddaa582b40d.png"
              }
              // link={"/virtual-assistant"}
            />
            <FeatureItem
              name={"Image Proccessing"}
              description={
                "lorem ipsum dolor sit amet consectetur adipisicing elit."
              }
              img={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtUy6dgZ6t9xQ8_0aPlPrYAkEfudd85K28YyUAGkO0ByaMvTfocybUB-Cejh7PsGw8xew&usqp=CAU"
              }
            />

            <FeatureItem
              name={"Generatic AI"}
              description={
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illu necessitatibus soluta nisi est esse libero porro reiciendis."
              }
              img={
                "https://img.freepik.com/free-vector/robotic-artificial-intelligence-technology-smart-lerning-from-bigdata_1150-48136.jpg"
              }
            />
          </Flex>
        </div>
      </div>
    </div>
  );
};
export default Homepage;
