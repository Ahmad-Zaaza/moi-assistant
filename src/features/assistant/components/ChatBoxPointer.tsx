interface Props {
  isBot: boolean;
}

export default function ChatBoxPointer({ isBot }: Props) {
  if (isBot)
    return (
      <svg
        width="8"
        height="12"
        viewBox="0 0 8 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -left-2 top-0 w-2 h-3 text-[#F3F4F6]"
        data-icon="AnswerTriangle"
        aria-hidden="true"
      >
        <path
          id="Rectangle 1"
          d="M1.03647 1.5547C0.59343 0.890144 1.06982 0 1.86852 0H8V12L1.03647 1.5547Z"
          fill="currentColor"
        ></path>
      </svg>
    );
  return (
    <svg
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute -right-2 top-0 w-2 h-3 text-[#E6E6DC]"
      data-icon="QuestionTriangle"
      aria-hidden="true"
    >
      <g id="Rectangle 2">
        <path
          d="M6.96353 1.5547C7.40657 0.890144 6.93018 0 6.13148 0H0V12L6.96353 1.5547Z"
          fill="currentColor"
        ></path>
        <path
          d="M6.96353 1.5547C7.40657 0.890144 6.93018 0 6.13148 0H0V12L6.96353 1.5547Z"
          fill="currentColor"
          fillOpacity="0.5"
        ></path>
      </g>
    </svg>
  );
}
