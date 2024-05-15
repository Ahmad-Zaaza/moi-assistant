import { useApi } from "api";
import { useAuth } from "features/auth/hooks/useAuth";
import { MutableRefObject, useRef, useState } from "react";
import { GenerateAnswerPayload } from "../types/assistant.types";
import { downloadAudioFile } from "../utils/assistant.utils";

const parseChunk = (chunk: string) => {
  try {
    const data = JSON.parse(chunk.split("data: ")[1]) as {
      answer: string;
      "error message": string | undefined;
    };
    return { answer: data.answer, error: data["error message"] };
  } catch (error) {
    return undefined;
  }
};

function parseDataFromChunk(chunk: string, key: "answer" | "error") {
  const d = chunk.split("\n\n");
  let result = "";
  d.forEach((el) => {
    try {
      if (!el.trim()) return;
      const data = parseChunk(el)?.[key];
      if (!data) return;
      result += data;
    } catch {
      //
    }
  });
  return result;
}

let controller: AbortController | undefined;

export const useSendAudioMessage = (
  audioRef: MutableRefObject<HTMLAudioElement>
) => {
  const { getAccessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const api = useApi();
  const audioChunks = useRef<BlobPart[]>([]);
  //   const invalidateConversation = useInvalidateConversation();
  //   const queryClient = useQueryClient();

  const onStreamStart = (body: GenerateAnswerPayload) => {
    controller = new AbortController();
    // Update the conversation in the cache with the new query
    // queryClient.setQueryData([""], (current: ConversationQueryCacheData) => {
    //   const currentConversationQueryCacheData = JSON.parse(
    //     JSON.stringify(current)
    //   ) as ConversationQueryCacheData;
    //   const nextQuery = {
    //     prompt: body.question,
    //     botId: body.botId,
    //     timestamp: Math.floor(new Date().getTime() / 1000),
    //     response: "",
    //   };
    //   const currentQueries =
    //     currentConversationQueryCacheData.data.data.queries ?? [];
    //   currentQueries.push(nextQuery);
    //   currentConversationQueryCacheData.data.data.queries = currentQueries;
    //   return currentConversationQueryCacheData;
    // });
  };

  const abortStream = () => {
    controller?.abort();
    setIsLoading(false);
  };

  const onNextChunk = (
    body: {
      botId: string;
      question: string;
    },
    nextChunk: string
  ) => {
    // Update the conversation in the cache with the new response
    // queryClient.setQueryData(
    //   getConversationQueryKey(body.botId),
    //   (current: ConversationQueryCacheData) => {
    //     const currentConversationQueryCacheData = JSON.parse(
    //       JSON.stringify(current)
    //     ) as ConversationQueryCacheData;
    //     if (currentConversationQueryCacheData.data.data.queries) {
    //       currentConversationQueryCacheData.data.data.queries[
    //         currentConversationQueryCacheData.data.data.queries.length - 1
    //       ].response += nextChunk;
    //     }
    //     return currentConversationQueryCacheData;
    //   }
    // );
  };

  const onEndCallback = () => {
    // void invalidateConversation(botId);
    setIsLoading(false);
  };

  const sendMessage = async ({ file }: GenerateAnswerPayload) => {
    setErrorMessage(undefined);
    onStreamStart({ file });
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
          errorResponse.message ?? `HTTP error! status: ${response.statusText}`
        );
      }

      if (!response.body) return;

      const reader = response.body.getReader();

      // const audioContext = new window.AudioContext();
      const mediaSource = new MediaSource();

      audioRef.current.src = URL.createObjectURL(mediaSource);

      mediaSource.addEventListener("sourceopen", () => {
        const sourceBuffer = mediaSource.addSourceBuffer("audio/mpeg");

        const readStream = async () => {
          const processChunk = async (chunk) => {
            return new Promise((resolve, reject) => {
              sourceBuffer.addEventListener("updateend", resolve, {
                once: true,
              });
              sourceBuffer.addEventListener("error", reject, { once: true });
              sourceBuffer.appendBuffer(chunk);
            });
          };

          while (1) {
            const { done, value } = await reader.read();
            console.log({ done, value });
            if (done) {
              mediaSource.endOfStream();
              break;
            }
            try {
              await processChunk(value.buffer);
            } catch (error) {
              console.error("Failed to append buffer:", error);
              break;
            }
          }
        };

        readStream().catch((error) =>
          console.error("Stream reading failed:", error)
        );
      });

      mediaSource.addEventListener("error", (e) => {
        console.error("MediaSource error:", e);
      });

      // void audioRef.current.play();
      // .catch((error) => console.error("Audio play failed:", error));

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
      //       onEndCallback();
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

export const useSendChatMessage = () => {
  const { getAccessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const api = useApi();

  const onStreamStart = (body: GenerateAnswerPayload) => {
    controller = new AbortController();
    // Update the conversation in the cache with the new query
  };

  const abortStream = () => {
    controller?.abort();
    setIsLoading(false);
  };

  const onNextChunk = (
    body: {
      botId: string;
      question: string;
    },
    nextChunk: string
  ) => {
    // Update the conversation in the cache with the new response
  };

  const onEndCallback = () => {
    setIsLoading(false);
  };

  const sendMessage = async (
    body: GenerateAnswerPayload & { conversationId: string }
  ) => {
    setErrorMessage(undefined);
    onStreamStart(body);
    setIsLoading(true);
    try {
      const token = getAccessToken();
      if (!token) return;
      const response = await api.rag.streamAnswer({
        token,
        signal: controller?.signal,
      });

      if (!response.ok) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const errorResponse: { message?: string } = await response.json();
        throw new Error(
          errorResponse.message ?? `HTTP error! status: ${response.statusText}`
        );
      }

      if (!response.body) return;

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      void reader.read().then(function processText({ done, value }) {
        if (done) {
          onEndCallback();
          return;
        }

        const chunk = decoder.decode(value, { stream: true });
        const nextText = parseDataFromChunk(chunk, "answer");
        if (nextText) {
          onNextChunk({}, nextText);
        }
        const nextError = parseDataFromChunk(chunk, "error");
        if (nextError) {
          setErrorMessage((current) => current + nextError);
        }

        void reader.read().then(processText);
      });
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
