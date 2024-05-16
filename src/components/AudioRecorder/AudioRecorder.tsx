/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-console */

import { useEffect, useRef, useState } from "react";
import {
  IMediaRecorder,
  MediaRecorder,
  register,
} from "extendable-media-recorder";
import { connect } from "extendable-media-recorder-wav-encoder";
import { message } from "antd";
import { PulseLoader } from "react-spinners";
import { HiOutlinePause, HiMiniStop, HiPlay } from "react-icons/hi2";
import { CANVAS_HEIGHT, CANVAS_WIDTH, path } from "./audioRecorder.utils";

await register(await connect());

interface AudioRecorderProps {
  onAudioData: (data: Blob) => Promise<void>;
  audioRef: React.MutableRefObject<HTMLAudioElement>;
  isStreaming?: boolean;
}

export default function AudioRecorder({
  onAudioData,
  audioRef,
  isStreaming,
}: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioState, setAudioState] = useState<
    "stopped" | "playing" | "paused"
  >("stopped");

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
      audioRef.current.remove();
      audioRef.current = new Audio();
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
        setAudioState("stopped");
        audioSource.disconnect();
        analyser.disconnect();
      };
      audioRef.current.remove();
      audioRef.current = new Audio();
      audioRef.current.removeEventListener("ended", handleEnded);
      setTimeout(timeoutfn, 500);
    };
    void audioRef.current.play().then(() => {
      setAudioState("playing");
      audioRef.current.addEventListener("ended", handleEnded);
      animationId.current = requestAnimationFrame(() => {
        draw(analyser, dataArray);
      });
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

  const stopAudio = () => {
    audioRef.current.pause();
    setAudioState("stopped");
    reset();
  };
  const pauseAudio = () => {
    if (audioState === "playing") {
      audioRef.current.pause();
      setAudioState("paused");
    }
  };

  const continueAudio = () => {
    if (audioState === "paused") {
      void audioRef.current.play();
      setAudioState("playing");
    }
  };

  // const onWelcome = () => {
  //   void fetch("/welcome.mp3")
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       const audioUrl = URL.createObjectURL(blob);
  //       audioRef.current.src = audioUrl;

  //       visualizeFromAudioFile();
  //     });
  // };

  return (
    <div className="flex flex-col items-center justify-center max-w-md gap-16 px-8 mx-auto">
      <div>
        <canvas
          id="assistant-canvas"
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="w-full bg-transparent rounded-full"
          ref={canvasRef}
        />
      </div>

      <div className="flex items-center gap-2 mx-auto">
        {isRecording ? (
          <button
            onClick={stopRecording}
            className="p-4 block text-lg text-white cursor-pointer bg-[#ff3243] transition-colors duration-100 hover:bg-[#e24451] border-none rounded-full shadow-lg mx-auto w-[200px]"
          >
            Stop recording
          </button>
        ) : isStreaming ? (
          <button
            disabled={isStreaming}
            className="p-4 flex items-center justify-center text-lg text-white cursor-pointer  bg-[#b68a35] transition-colors duration-100 [&:not(:disabled)]:hover:bg-[#e3ad42] border-none rounded-full shadow-lg h-[60px] w-[200px]"
          >
            <PulseLoader color="white" size={14} />
          </button>
        ) : audioState === "playing" ? (
          <>
            <button
              onClick={pauseAudio}
              className="p-4 flex items-center justify-center text-lg text-white cursor-pointer  bg-[#b68a35] transition-colors duration-100 [&:not(:disabled)]:hover:bg-[#e3ad42] border-none rounded-full shadow-lg w-[200px]"
            >
              <HiOutlinePause size={35} />
              Pause
            </button>
            <button
              onClick={stopAudio}
              className="p-4 flex items-center justify-center rounded-full text-lg text-white cursor-pointer  bg-[#b68a35] transition-colors duration-100 [&:not(:disabled)]:hover:bg-[#e3ad42] border-none  shadow-lg w-[70px]"
            >
              <HiMiniStop size={35} />
            </button>
          </>
        ) : audioState === "paused" ? (
          <>
            <button
              onClick={continueAudio}
              className="p-4 flex items-center justify-center text-lg text-white cursor-pointer  bg-[#b68a35] transition-colors duration-100 [&:not(:disabled)]:hover:bg-[#e3ad42] border-none rounded-full shadow-lg w-[200px]"
            >
              <HiPlay size={35} />
              Continue
            </button>
            <button
              onClick={stopAudio}
              className="p-4 flex items-center justify-center rounded-full text-lg text-white cursor-pointer  bg-[#b68a35] transition-colors duration-100 [&:not(:disabled)]:hover:bg-[#e3ad42] border-none  shadow-lg w-[70px]"
            >
              <HiMiniStop size={35} />
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              void captureAndTranscribeAudio();
            }}
            className="p-4 flex items-center justify-center text-lg text-white cursor-pointer  bg-[#b68a35] transition-colors duration-100 [&:not(:disabled)]:hover:bg-[#e3ad42] border-none rounded-full shadow-lg w-[200px]"
          >
            Click to speak
          </button>
        )}
      </div>
      {/* <Button onClick={onWelcome}>Welcome me</Button> */}
    </div>
  );
}
