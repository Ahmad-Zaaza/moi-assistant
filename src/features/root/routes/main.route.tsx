import AudioRecorder from "components/AudioRecorder/AudioRecorder";
import { useSendAudioMessage } from "features/assistant/hooks/assistant.hooks";
import { useRef } from "react";

// Register the wav encoder
export default function Main() {
  const audio = useRef<HTMLAudioElement>(new Audio());
  const { sendMessage } = useSendAudioMessage(audio);

  const onAudioData = async (data: Blob) => {
    try {
      await sendMessage({ file: data });
      return true;
    } catch (error) {
      console.log({ error });
    }
  };
  return <AudioRecorder audioRef={audio} onAudioData={onAudioData} />;
}
