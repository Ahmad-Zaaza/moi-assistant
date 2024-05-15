import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";

export function Root() {
  return (
    <Layout className="flex flex-col h-screen">
      <div className="p-6">
        <Logo />
      </div>

      <Layout.Content className="flex-1 overflow-auto">
        <Outlet />
      </Layout.Content>
    </Layout>
  );
}
