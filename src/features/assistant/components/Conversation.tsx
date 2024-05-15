import { Card, Typography } from "antd";
import { useState } from "react";
import ChatQueries from "./ChatQueries";
import { useAssistantInferenceContext } from "./AssistantInferenceProvider";

interface ConversationProps {
  isLoading: boolean;
  errorMessage?: string;
}

export default function Conversation({
  isLoading,
  errorMessage,
}: ConversationProps) {
  const [userScrolled, setUserScrolled] = useState(false);

  const { conversation } = useAssistantInferenceContext();

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
      // extra={
      //   <Button
      //     className="text-white text-xs font-medium hover:!text-white"
      //     type="text"
      //     //   onClick={handleReset}
      //     //   loading={isResetLoading}
      //   >
      //     Restart
      //   </Button>
      // }
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
