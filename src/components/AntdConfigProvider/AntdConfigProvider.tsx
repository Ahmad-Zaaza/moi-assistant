import { LoadingOutlined } from "@ant-design/icons";
import { ConfigProvider, Spin } from "antd";
import { ReactNode } from "react";
import useTheme from "../../styles/useTheme";

Spin.setDefaultIndicator(<LoadingOutlined spin />);

export default function AntdConfigProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { themeConfig } = useTheme();
  return <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>;
}
