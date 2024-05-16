import { Card, Typography, message } from "antd";
import { useState } from "react";
import { useResetConversation } from "../hooks/assistant.hooks";
import ChatQueries from "./ChatQueries";
import {
  defaultConversation,
  useAssistantInferenceContext,
} from "./AssistantInferenceProvider";

interface ConversationProps {
  isLoading: boolean;
  errorMessage?: string;
}

export default function Conversation({
  isLoading,
  errorMessage,
}: ConversationProps) {
  const [userScrolled, setUserScrolled] = useState(false);

  const { mutate, isPending: isResetting } = useResetConversation();
  const { conversation, setConversation } = useAssistantInferenceContext();

  const handleReset = () => {
    mutate(
      { bot_id: "4f306b6e-7f85-49eb-9076-14591a5aa671" },
      {
        onSuccess: () => {
          void message.success("Conversation restarted");
          setConversation(defaultConversation);
        },
        onError: (e) => {
          void message.error(`Error ${e.message}`);
        },
      },
    );
  };

  return (
    <Card
      bordered={false}
      className="border-2 !rounded-2xl z-10 h-full flex flex-col"
      classNames={{
        header: "!h-[64px] !min-h-[44px] rounded-t-3xl  !border-b-0",
        body: "bg-white !rounded-t-xl !rounded-b-xl !p-0 h-full flex flex-col",
      }}
      styles={{
        header: {
          background: "#f1e7d1",
        },
      }}
      title={
        <div className="flex items-center gap-2 text-white">
          <Typography.Title level={5} className="!mb-0 !text-[#b68a35]">
            Conversation
          </Typography.Title>
        </div>
      }
      extra={
        <button
          disabled={isResetting}
          onClick={handleReset}
          className="p-2 flex items-center justify-center text-xs text-white cursor-pointer  bg-[#a87e25] transition-colors duration-100 [&:not(:disabled)]:hover:bg-[#e3ad42] border-none rounded-full shadow-lg"
        >
          Restart
        </button>
      }
    >
      <ChatQueries
        userScrolled={userScrolled}
        setUserScrolled={setUserScrolled}
        isStreaming={isLoading}
        conversation={conversation}
        errorMessage={errorMessage}
      />
    </Card>
  );
}
