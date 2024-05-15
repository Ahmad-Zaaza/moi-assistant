/* eslint-disable react/no-array-index-key */
import { Fragment, useEffect, useRef } from "react";
import { ErrorIcon } from "icons";
import ChatItem from "./ChatItem";
import { Conversation } from "./AssistantInferenceProvider";

interface Props {
  errorMessage: string | undefined;
  userScrolled: boolean;
  setUserScrolled: (value: boolean) => void;
  isStreaming: boolean;
  conversation: Conversation[];
}

export default function ChatQueries({
  errorMessage,
  isStreaming,
  conversation,
  userScrolled,
  setUserScrolled,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // follow the new message if users hasn't scrolled up
  useEffect(() => {
    if (!userScrolled) {
      ref.current?.scroll(0, ref.current.scrollHeight);
    }
  }, [conversation, userScrolled]);

  const handleScroll = () => {
    if (
      ref.current &&
      ref.current.scrollTop + ref.current.clientHeight !==
        ref.current.scrollHeight
    ) {
      setUserScrolled(true);
    } else {
      setUserScrolled(false);
    }
  };

  return (
    <div
      className="flex flex-col gap-8 p-8 overflow-auto"
      style={{ flex: "1 1 0" }}
      ref={ref}
      onScroll={handleScroll}
    >
      {conversation.map((item, index) => {
        return (
          <Fragment key={index}>
            <ChatItem
              sender={item.role === "user" ? "user" : "bot"}
              message={item.message}
            />
          </Fragment>
        );
      })}
      {isStreaming ? (
        <ChatItem sender="bot" message="" isLoading={isStreaming} />
      ) : null}
      {errorMessage && (
        <div className="bg-[#F8C9D2] text-[#710E21] rounded-lg p-2 text-xs flex gap-2">
          <ErrorIcon />
          {errorMessage}
        </div>
      )}
    </div>
  );
}
