import { Button } from "antd";
import { FiMoon, FiSun } from "react-icons/fi";
import useTheme from "styles/useTheme";

export default function ThemeSwitcher() {
  const { isLightTheme, switchTheme } = useTheme();

  return (
    <Button
      onClick={switchTheme}
      type="text"
      icon={
        <div className="anticon ant-menu-item-icon">
          {isLightTheme ? <FiMoon /> : <FiSun />}
        </div>
      }
    />
  );
}
