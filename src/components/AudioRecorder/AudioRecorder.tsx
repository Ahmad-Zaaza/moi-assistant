/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useRef, useState } from "react";
import {
  IMediaRecorder,
  MediaRecorder,
  register,
} from "extendable-media-recorder";
import { connect } from "extendable-media-recorder-wav-encoder";
import { Button, message } from "antd";
import { CANVAS_HEIGHT, CANVAS_WIDTH, path } from "./audioRecorder.utils";
// import AudioVisualizer from "components/AudioVisualizer/AudioVisualizer";

await register(await connect());

interface AudioRecorderProps {
  onAudioData: (data: Blob) => Promise<void>;
  audioRef: React.MutableRefObject<HTMLAudioElement>;
}

export default function AudioRecorder({
  onAudioData,
  audioRef,
}: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);

  const recorder = useRef<IMediaRecorder | null>(null);

  const stream = useRef<MediaStream | null>(null);

  const audioChunks = useRef<BlobPart[]>([]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const animationId = useRef<number | null>(null);

  function pushChunks(event: BlobEvent) {
    audioChunks.current.push(event.data);
  }

  async function captureAndTranscribeAudio(): Promise<void> {
    try {
      await setMediaRecorder();

      if (recorder.current && stream.current) {
        // Start recording.
        setIsRecording(true);
        recorder.current.start(200);
        recorder.current.ondataavailable = pushChunks;
        visualizeFromStream();
      }
    } catch (error) {
      console.log({ error });
      await message.error("Error capturing audio");
    }
  }

  // Call the function to start capturing and transcribing audio

  async function setMediaRecorder() {
    stream.current = await navigator.mediaDevices.getUserMedia({ audio: true });

    recorder.current = new MediaRecorder(stream.current, {
      mimeType: "audio/wav",
    });
  }

  function reset() {
    setIsRecording(false);
    audioChunks.current = [];
    const timeoutfn = () => {
      recorder.current = null;
      stream.current = null;
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
    setTimeout(timeoutfn, 500);
  }

  const draw = (analyser: AnalyserNode, dataArray: Uint8Array) => {
    animationId.current = requestAnimationFrame(() => {
      draw(analyser, dataArray);
    });
    analyser.getByteFrequencyData(dataArray);
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    // set size to clear the canvas on each frame
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    const c = canvas.getContext("2d");
    if (!c) {
      return;
    }
    // draw three curves (R/G/B)
    path(0, c, dataArray);
    path(1, c, dataArray);
    path(2, c, dataArray);
  };

  function visualizeFromAudioFile() {
    const audioContext = new AudioContext();
    const audioSource = audioContext.createMediaElementSource(audioRef.current);
    const analyser = audioContext.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const handleEnded = function () {
      const timeoutfn = () => {
        if (animationId.current) {
          cancelAnimationFrame(animationId.current);
        }
        void audioContext.close();
        audioSource.disconnect();
        analyser.disconnect();
      };
      setTimeout(timeoutfn, 500);
    };
    void audioRef.current.play();

    audioRef.current.addEventListener("ended", handleEnded);
    animationId.current = requestAnimationFrame(() => {
      draw(analyser, dataArray);
    });
  }

  function visualizeFromStream() {
    if (!stream.current) {
      return;
    }
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const audioSource = audioContext.createMediaStreamSource(stream.current);
    audioSource.connect(analyser);
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    animationId.current = requestAnimationFrame(() => {
      draw(analyser, dataArray);
    });
  }

  function cancelRecording() {
    if (recorder.current && stream.current) {
      recorder.current.stop();
      stream.current.getTracks().forEach((track) => {
        track.stop();
      });
    }
  }

  function stopRecording() {
    if (recorder.current && stream.current) {
      recorder.current.onstop = async () => {
        const blob = new Blob(audioChunks.current, {
          type: recorder.current?.mimeType,
        });
        reset();
        await onAudioData(blob);
        visualizeFromAudioFile();
      };
      cancelRecording();
    }
  }

  function resetCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const c = canvas.getContext("2d");
    if (!c) {
      return;
    }

    const arr = new Uint8Array(0);
    path(0, c, arr);
    path(1, c, arr);
    path(2, c, arr);
  }

  useEffect(() => {
    resetCanvas();
    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, []);

  const onWelcome = () => {
    void fetch("/welcome.mp3")
      .then((response) => response.blob())
      .then((blob) => {
        const audioUrl = URL.createObjectURL(blob);
        audioRef.current.src = audioUrl;

        visualizeFromAudioFile();
      });
  };

  return (
    <div>
      {!isRecording ? (
        <Button
          onClick={() => {
            void captureAndTranscribeAudio();
          }}
        >
          Start recording
        </Button>
      ) : (
        <Button onClick={stopRecording}>Stop recording</Button>
      )}
      <Button onClick={onWelcome}>Welcome me</Button>
      <div className="max-w-lg px-8 mx-auto">
        <canvas
          id="assistant-canvas"
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="bg-transparent rounded-full"
          ref={canvasRef}
        />
      </div>
    </div>
  );
}
