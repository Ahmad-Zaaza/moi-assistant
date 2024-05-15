import { Typography } from "antd";
import { Link } from "react-router-dom";
import { MicrophoneIcon } from "icons";
import Logo from "../components/Logo";

// Register the wav encoder
export default function Main() {
  return (
    <div className="relative h-full flex flex-col gap-8 justify-center items-center mx-auto max-w-[1366px]">
      <Logo />
      <div>
        <Typography.Title level={3} className="text-center !font-medium">
          Hi there! I&apos;m your MOI AI assistant, ready to make your day
          easier.
        </Typography.Title>
        <Typography.Title level={3} className="text-center !font-medium">
          What can I do for you today?
        </Typography.Title>
      </div>
      <Link to="/assistant">
        <button className="flex items-center gap-4 justify-center p-4 text-lg text-white cursor-pointer bg-[#b68a35] transition-colors duration-100 hover:bg-[#e3ad42] border-none rounded-full shadow-lg w-[300px]">
          <MicrophoneIcon className="text-white" />
          Ask me a question
        </button>
      </Link>
    </div>
  );
}
