import { Spin, SpinProps } from "antd";
import { cx } from "cva";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  size?: SpinProps["size"];
  tip?: string;
  minHeight?: string;
  className?: string;
}

export default function LoadingSpinner({
  children,
  size = "large",
  tip,
  minHeight,
  className,
}: Props) {
  return (
    <div
      style={{ minHeight }}
      className={cx("flex items-center justify-center h-full", className)}
    >
      <Spin size={size} tip={tip}>
        {children}
      </Spin>
    </div>
  );
}
