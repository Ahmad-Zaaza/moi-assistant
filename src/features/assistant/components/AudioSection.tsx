/* eslint-disable no-console */

import AudioRecorder from "components/AudioRecorder/AudioRecorder";
import Logo from "features/root/components/Logo";
import { GenerateAnswerPayload } from "../types/assistant.types";

interface AudioSectionProps {
  isLoading: boolean;
  audioRef: React.MutableRefObject<HTMLAudioElement>;
  sendMessage: ({ file }: GenerateAnswerPayload) => Promise<void>;
}

export default function AudioSection({
  isLoading,
  sendMessage,
  audioRef,
}: AudioSectionProps) {
  const onAudioData = async (data: Blob) => {
    try {
      await sendMessage({ file: data });
      // return true;
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-16">
      <Logo />
      <div>
        <AudioRecorder
          audioRef={audioRef}
          isStreaming={isLoading}
          onAudioData={onAudioData}
        />
      </div>
    </div>
  );
}
