/* eslint-disable no-console */

import { useApi } from "api";
import { useAuth } from "features/auth/hooks/useAuth";
import { MutableRefObject, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { GenerateAnswerPayload } from "../types/assistant.types";
import { useAssistantInferenceContext } from "../components/AssistantInferenceProvider";

const parseChunk = (chunk: string) => {
  try {
    const data = chunk.split("data: ")[1];
    return { answer: data };
  } catch (error) {
    return undefined;
  }
};

function parseDataFromChunk(chunk: string) {
  const d = chunk.split(`\n\n ~`);
  let result = "";
  d.forEach((el) => {
    try {
      if (!el.trim()) return;
      const data = parseChunk(el)?.answer;
      if (!data) return;
      result += data;
    } catch (error) {
      console.log({ error });
    }
  });
  return result;
}

let controller: AbortController | undefined;

export const useSendAudioMessage = (
  audioRef: MutableRefObject<HTMLAudioElement>,
) => {
  const { setConversation } = useAssistantInferenceContext();
  const { getAccessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const api = useApi();

  const abortStream = () => {
    controller?.abort();
    setIsLoading(false);
  };

  const sendMessage = async ({ file }: GenerateAnswerPayload) => {
    setErrorMessage(undefined);
    setIsLoading(true);
    try {
      const token = getAccessToken();
      if (!token) return;

      const formData = new FormData();
      formData.append("file", file);

      const response = await api.rag.streamAudio({
        token,
        signal: controller?.signal,
        formData,
      });

      if (!response.ok) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const errorResponse: { message?: string } = await response.json();
        throw new Error(
          errorResponse.message ?? `HTTP error! status: ${response.statusText}`,
        );
      }

      if (!response.body) return;

      const reader = response.body.getReader();

      const mediaSource = new MediaSource();

      audioRef.current.src = URL.createObjectURL(mediaSource);

      mediaSource.addEventListener("sourceopen", () => {
        let i = 0;
        const sourceBuffer = mediaSource.addSourceBuffer("audio/mpeg");

        const processChunk = async (chunk: Uint8Array["buffer"]) => {
          return new Promise((resolve, reject) => {
            sourceBuffer.addEventListener("updateend", resolve, {
              once: true,
            });
            sourceBuffer.addEventListener("error", reject, { once: true });
            sourceBuffer.appendBuffer(chunk);
          });
        };

        const readStream = () => {
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, no-constant-condition
          void reader.read().then(async ({ done, value }) => {
            if (done) {
              mediaSource.endOfStream();
              setIsLoading(false);
              return;
            }

            const decoder = new TextDecoder();
            const chunk = decoder.decode(value, { stream: true });
            const nextText = parseDataFromChunk(chunk);
            if (nextText) {
              // Text in our specified format is detected
              // we will receieve two text chunks, the first is for the user prompt transcribtion
              // the second is the rag text response
              if (i === 0) {
                setConversation((current) => [
                  ...current,
                  { role: "user", message: nextText },
                ]);
                i++;
              } else if (i === 1) {
                setConversation((current) => [
                  ...current,
                  { role: "assistant", message: nextText },
                ]);
                i = 0;
              }
            } else {
              await processChunk(value.buffer);
            }
            readStream();
          });
        };

        readStream();
      });

      mediaSource.addEventListener("error", (e) => {
        console.error("MediaSource error:", e);
      });

      // void audioRef.current.play();
      // .catch((error) => console.error("Audio play failed:", error));

      // 😀 SECOND
      // void reader.read().then(function processChunk({ done, value }) {
      //   console.log({ value, done });
      //   if (done) {
      //     console.log({ audioChunks: audioChunks.current });
      //     // Build the complete audio buffer
      //     const audioBlob = new Blob(audioChunks.current, {
      //       type: "audio/mpeg",
      //     });
      //     console.log({ audioBlob });
      //     const audioUrl = URL.createObjectURL(audioBlob);
      //     downloadAudioFile(audioBlob, "audio.mp3");
      //     const audio = new Audio(audioUrl);
      //     void audio.play().then(() => {
      //       setIsLoading(false);
      //     });
      //     return;
      //   }

      //   audioChunks.current.push(value);

      //   void reader.read().then(processChunk);
      // });
    } catch (err) {
      const error = err as Error;
      setErrorMessage(error.message);
      setIsLoading(false);
      if (error.name === "AbortError") return;
      void Promise.reject(error);
    }
  };

  return { sendMessage, isLoading, abortStream, errorMessage, setErrorMessage };
};

export const useResetConversation = () => {
  const api = useApi();
  const { getAccessToken } = useAuth();
  const token = getAccessToken();

  return useMutation({
    mutationFn: ({ conv_id }: { conv_id: string }) =>
      api.rag.resetBot({ token, conv_id }),
  });
};
