import Markdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  message: string | undefined;
}

function ChatMessageRendererInternal({ message }: Props) {
  if (!message) return null;

  return (
    <Markdown remarkPlugins={[remarkGfm, remarkMath, remarkBreaks]}>
      {message}
    </Markdown>
  );
}

export default function ChatMessageRenderer({ message }: Props) {
  return (
    <ErrorBoundary
      fallback={
        <Markdown remarkPlugins={[remarkGfm, remarkMath, remarkBreaks]}>
          {"I could not generate a response for that question."}
        </Markdown>
      }
    >
      <ChatMessageRendererInternal message={message} />
    </ErrorBoundary>
  );
}
