import AssistantInferenceProvider from "../components/AssistantInferenceProvider";
import AssistantChat from "../components/AssistantChat";

export default function AssistantChatPage() {
  return (
    <AssistantInferenceProvider>
      <AssistantChat />
    </AssistantInferenceProvider>
  );
}
