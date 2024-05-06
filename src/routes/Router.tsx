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
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
