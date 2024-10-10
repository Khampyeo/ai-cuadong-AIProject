"use client";

import { useEffect, useState } from "react";
import { Button, Flex, message } from "antd";
import useSpeechToText from "@/hooks/useSpeechToText";
import useAvatar from "@/hooks/useVirtualAssistant";
import { Message } from "@/types/realtime-assistant";
import Microphone from "./components/Microphone";
import Subtitle from "./components/Subtitle";
import VirtualVideo from "./components/VirtualVideo";

const GeneraticAi = () => {
  const [isSubtitle, setIsSubtitle] = useState(false);
  const {
    startSession,
    stopSession,
    isLoading,
    isOpen,
    myAvatarVideoEleRef,
    pcId,
    sendMessage,
    messageReceived,
  } = useAvatar();
  const {
    transcript,
    listening,
    startListening,
    stopListening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechToText();

  const [conversation, setConversation] = useState<Message[]>([]);

  useEffect(() => {
    const newConversation = [...conversation];
    newConversation.push({
      message: messageReceived,
      actor: "user",
    });
    setConversation(newConversation);
  }, [messageReceived]);
  console.log(conversation);

  useEffect(() => {
    if (!browserSupportsSpeechRecognition)
      message.error("Browser not support speech recognition!");
  }, [browserSupportsSpeechRecognition]);

  return (
    <div className="pt-4">
      <Flex gap={16} justify="center">
        <div className="relative flex items-center flex-col text-text-primary">
          <div className="">
            <VirtualVideo
              isLoading={isLoading}
              isOpen={isOpen}
              startSession={startSession}
              stopSession={() => {
                stopSession();
                stopListening();
              }}
              myAvatarVideoEleRef={myAvatarVideoEleRef}
            />
          </div>
          <div className="mt-5">
            <Microphone
              start={() => {
                startListening();
              }}
              stop={() => {
                if (transcript) {
                  sendMessage({
                    pc_id: pcId!,
                    input_text: transcript,
                    use_gpt: "true",
                    conversation_histories: [],
                    request_type: "question",
                  });
                }
                stopListening();
                setTimeout(() => {
                  resetTranscript();
                }, 1000);
              }}
              isListening={listening}
              isStartVirtual={isOpen}
            />
          </div>
        </div>
        <div className="">
          <Button
            type={isSubtitle ? "primary" : "default"}
            onClick={() => setIsSubtitle(!isSubtitle)}
          >
            Subtitle
          </Button>
          {isSubtitle && (
            <div className="mt-4">
              <Subtitle
                sendMessage={(text: string) =>
                  sendMessage({
                    pc_id: pcId!,
                    input_text: text,
                    use_gpt: "true",
                    conversation_histories: [],
                    request_type: "question",
                  })
                }
              />
            </div>
          )}
        </div>
      </Flex>
    </div>
  );
};

export default GeneraticAi;
