"use client";

import { useRef, useState } from "react";
import { Flex, Input } from "antd";
import ArrowIcon from "@/../public/icons/icon_arrow__up.svg";

type Props = {
  sendMessage: (text: string) => void;
};

const Subtitle = ({ sendMessage }: Props) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState<string>("");

  return (
    <div className="relative xl:w-[25rem] w-[20rem] rounded-lg xl:h-[30rem] h-[25rem] p-3 overflow-y-auto bg-black/5 dark:bg-white/10 border border-border">
      <p ref={textRef} className="text-text-primary text-base limited-text"></p>
      <div className="absolute left-0 bottom-2 w-full px-2">
        <Flex
          gap={8}
          className="bg-background-secondary w-full rounded-full overflow-hidden p-2"
        >
          <Input
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text} // Bind value to input
            size="small"
            className="!outline-none !shadow-none !border-none !bg-background-secondary"
          />
          <Flex
            justify="center"
            align="center"
            className="shrink-0 w-7 h-7 rounded-full text-gray-800 dark:text-gray-900 bg-gray-200 dark:bg-gray-700 cursor-pointer hover:opacity-75 transition-all"
            onClick={() => {
              if (text.trim()) {
                sendMessage(text);
                setText("");
              }
            }}
          >
            <ArrowIcon />
          </Flex>
        </Flex>
      </div>
    </div>
  );
};

export default Subtitle;
