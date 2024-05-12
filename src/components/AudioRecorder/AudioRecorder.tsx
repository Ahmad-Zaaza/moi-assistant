import { useRef, useState } from "react";
import {
  IMediaRecorder,
  MediaRecorder,
  register,
} from "extendable-media-recorder";
import { connect } from "extendable-media-recorder-wav-encoder";
import { Button, message } from "antd";

export default function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const recorder = useRef<IMediaRecorder | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const audioChunks = useRef<BlobPart[]>([]);

  function pushChunks(event: BlobEvent) {
    audioChunks.current.push(event.data);
  }

  async function captureAndTranscribeAudio(): Promise<void> {
    try {
      await setMediaRecorder();
      if (recorder.current && stream.current) {
        // Start recording.
        recorder.current.start(200);
        recorder.current.ondataavailable = pushChunks;
      }
    } catch (error) {
      await message.error("Error capturing audio");
    }
  }

  // Call the function to start capturing and transcribing audio

  async function setMediaRecorder() {
    await register(await connect());
    stream.current = await navigator.mediaDevices.getUserMedia({ audio: true });
    recorder.current = new MediaRecorder(stream.current, {
      mimeType: "audio/wav",
    });
  }

  function stopRecording() {
    if (recorder.current && stream.current) {
      recorder.current.onstop = () => {
        const blob = new Blob(audioChunks.current, {
          type: recorder.current?.mimeType,
        });
        // download the blob
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `audio.wav`;
        a.click();
        URL.revokeObjectURL(url);
        audioChunks.current = [];
        recorder.current = null;
        stream.current = null;
      };
      cancelRecording();
    }
  }

  function cancelRecording() {
    if (recorder.current && stream.current) {
      recorder.current.stop();
      stream.current.getTracks().forEach((track) => {
        track.stop();
      });
    }
  }

  return (
    <div>
      {!isRecording ? (
        <Button
          onClick={() => {
            void captureAndTranscribeAudio();
            setIsRecording(true);
          }}
        >
          Start recording
        </Button>
      ) : (
        <Button
          onClick={() => {
            stopRecording();
            setIsRecording(false);
          }}
        >
          Stop recording
        </Button>
      )}
    </div>
  );
}
