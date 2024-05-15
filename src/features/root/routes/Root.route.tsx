import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import soundwave from "assets/soundwave.png";

export function Root() {
  return (
    <Layout className="flex flex-col h-screen">
      <Layout.Content className="flex-1 overflow-auto">
        <Outlet />
        <img
          src={soundwave}
          alt="soundwave"
          className="absolute bottom-0 w-screen pointer-events-none"
        />
      </Layout.Content>
    </Layout>
  );
}
