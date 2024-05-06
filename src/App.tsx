import AntdConfigProvider from "./components/AntdConfigProvider";
import ReactQueryProvider from "./components/ReactQueryProvider";
import Router from "./routes";

export default function App() {
  return (
    <AntdConfigProvider>
      <ReactQueryProvider>
        <Router />
      </ReactQueryProvider>
    </AntdConfigProvider>
  );
}
