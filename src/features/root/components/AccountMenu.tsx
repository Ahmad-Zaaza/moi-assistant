import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Popover, Typography } from "antd";
import { logout, getUserInfo } from "auth";

export default function AccountMenu() {
  const user = getUserInfo();
  return (
    <Popover
      rootClassName="pr-10"
      trigger={["click"]}
      content={
        <div>
          <div className="flex flex-col">
            <Typography.Text>{user.username}</Typography.Text>
            <Typography.Text className="text-xs" type="secondary">
              {user.email}
            </Typography.Text>
          </div>
          <Button
            className="mt-4"
            block
            icon={<LogoutOutlined />}
            onClick={logout}
            type="text"
          >
            Log out
          </Button>
        </div>
      }
    >
      <Button type="text" icon={<UserOutlined />} />
    </Popover>
  );
}
