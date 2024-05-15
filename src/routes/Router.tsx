import { Root } from "features/root/routes/Root.route";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        async lazy() {
          const Main = await import("features/root/routes/main.route").then(
            (module) => module.default
          );
          return { Component: Main };
        },
      },
      {
        path: "assistant",
        async lazy() {
          const AssistantChatPage = await import(
            "features/assistant/routes/AssistantChatPage"
          ).then((module) => module.default);
          return { Component: AssistantChatPage };
        },
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
