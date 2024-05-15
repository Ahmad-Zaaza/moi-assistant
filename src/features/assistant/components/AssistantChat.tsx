import { useRef } from "react";
import Conversation from "../components/Conversation";
import AudioSection from "../components/AudioSection";
import { useSendAudioMessage } from "../hooks/assistant.hooks";

export default function AssistantChat() {
  const audio = useRef<HTMLAudioElement>(new Audio());
  const { sendMessage, isLoading, errorMessage } = useSendAudioMessage(audio);
  return (
    <div className="gap-8 flex p-8 h-full mx-auto max-w-[1366px]">
      <AudioSection audioRef={audio} isLoading={isLoading} sendMessage={sendMessage} />
      <div className="flex-1">
        <Conversation errorMessage={errorMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}
