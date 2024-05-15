/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

export interface Conversation {
  role: "user" | "assistant";
  message: string;
}

interface Context {
  conversation: Conversation[];
  setConversation: Dispatch<SetStateAction<Conversation[]>>;
}

export const AssistantInferenceContext = createContext<Context>({
  conversation: [],
  setConversation: () => {},
});

export default function AssistantInferenceProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [conversation, setConversation] = useState<Conversation[]>([
    {
      role: "assistant",
      message: "Hello! How can I help you today?",
    },
  ]);

  const value = useMemo(
    () => ({ conversation, setConversation }),
    [conversation, setConversation]
  );

  return (
    <AssistantInferenceContext.Provider value={value}>
      {children}
    </AssistantInferenceContext.Provider>
  );
}

export const useAssistantInferenceContext = () => {
  const context = useContext(AssistantInferenceContext);

  if (!context) {
    throw new Error(
      "useAssistantProvider must be used within a AssistantProvider"
    );
  }
  return context;
};
