"use client";

import { useState } from "react";
import { Flex, Input } from "antd";
import clsx from "clsx";
import { Message } from "@/types/realtime-assistant";
import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";
import ArrowIcon from "@/../public/icons/icon_arrow__up.svg";

type Props = {
  sendMessage: (text: string) => void;
  conversation: Message[];
};

const Subtitle = ({ sendMessage, conversation }: Props) => {
  const [text, setText] = useState<string>("");
  const handleSendMessage = (message: string) => {
    if (message.trim()) {
      sendMessage(message);
      setText("");
    }
  };
  return (
    <div className="relative xl:w-[25rem] w-[20rem] rounded-lg xl:h-[30rem] h-[25rem] p-3 overflow-y-auto bg-black/5 dark:bg-white/10 border border-border">
      <div className="h-full pb-14">
        <Flex vertical gap={16} className="h-full pr-4 overflow-y-auto">
          {conversation.map((message, key) =>
            message.actor === "bot" ? (
              <BotMessage key={key} message={message.message} />
            ) : (
              <UserMessage key={key} message={message.message} />
            )
          )}
        </Flex>
      </div>
      <div className="absolute left-0 bottom-2 w-full px-2">
        <Flex
          gap={8}
          className="bg-background-secondary w-full rounded-full overflow-hidden p-2"
        >
          <Input
            onChange={(e) => {
              setText(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage(text);
            }}
            value={text}
            size="small"
            className="!outline-none !shadow-none !border-none !bg-background-secondary"
          />
          <Flex
            justify="center"
            align="center"
            className={clsx(
              "shrink-0 w-7 h-7 rounded-full transition-all",
              text.trim()
                ? "cursor-pointer hover:opacity-75 text-gray-800 dark:text-gray-900 bg-gray-300 dark:bg-gray-400"
                : "text-gray-800 dark:text-gray-900 bg-gray-200 dark:bg-gray-700"
            )}
            onClick={() => {
              handleSendMessage(text);
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
