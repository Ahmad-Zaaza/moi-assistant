import { Divider, Layout, Menu, theme } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import AppTitle from "../components/AppTitle";
import Logo from "../components/Logo";
import ThemeSwitcher from "../components/ThemeSwitcher";

export function Root() {
  const { colorBorder } = theme.useToken().token;
  const location = useLocation();

  return (
    <Layout className="flex flex-col h-screen">
      <Layout.Header
        className="flex items-center justify-between gap-4"
        style={{ borderBottom: `1px solid ${colorBorder}` }}
      >
        <div className="flex items-center flex-1 gap-2">
          <Logo showText={false} />
          <AppTitle />
          <Divider type="vertical" />
          <Menu
            className="flex-1 bg-inherit"
            mode="horizontal"
            items={[{ label: <Link to="/">Home</Link>, key: "/" }]}
            selectedKeys={[location.pathname]}
          />
        </div>
        <div className="flex gap-1">
          <ThemeSwitcher />
        </div>
      </Layout.Header>
      <Layout.Content className="flex-1 overflow-auto">
        <Outlet />
      </Layout.Content>
    </Layout>
  );
}
