import { Avatar, Typography } from "antd";
import { PulseLoader } from "react-spinners";
import classNames from "classnames";
import { UserIcon } from "icons";
import "./chatItem.css";
import ChatMessageRenderer from "../ChatMessage";
import ChatBoxPointer from "../ChatBoxPointer";

interface ChatItemProps {
  displaySources?: boolean;
  message: string | undefined;
  sender: "user" | "bot";
  isLoading?: boolean;
}

export default function ChatItem({
  message,
  sender,
  isLoading,
}: ChatItemProps) {
  const isBot = sender === "bot";
  return (
    <div className="chat-item">
      <div
        className={classNames("flex items-start justify-start gap-4", {
          "justify-end": !isBot,
        })}
      >
        {isBot && (
          <Avatar
            size="large"
            className="border-2 border-gray-200 border-solid shrink-0 bg-brand-primary"
            icon={<UserIcon />}
          >
            {sender}
          </Avatar>
        )}
        <div
          className={classNames("rounded-lg px-4 py-3 relative", {
            "bg-[#F3F4F6] rounded-tl-none": isBot,
            "bg-[#E6E6DC] rounded-tr-none": !isBot,
          })}
        >
          <Typography.Text className="!mb-0 whitespace-pre-wrap break-words text-[#101828]">
            <ChatMessageRenderer message={message} />
            {isLoading && sender === "bot" && !message?.length ? (
              <PulseLoader className="inline ms-1" color="#6b7280" size={8} />
            ) : null}
          </Typography.Text>
          <ChatBoxPointer isBot={isBot} />
        </div>
        {!isBot && (
          <Avatar
            size="large"
            className="shrink-0 bg-[#46131F] border-2 border-solid border-gray-200"
            icon={<UserIcon />}
          />
        )}
      </div>
    </div>
  );
}
