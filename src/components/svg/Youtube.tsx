import { SVGProps } from "react";
const Youtube = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.667}
      d="M30.053 8.56a3.706 3.706 0 0 0-2.586-2.667C25.173 5.333 16 5.333 16 5.333s-9.173 0-11.467.614a3.707 3.707 0 0 0-2.586 2.666 38.667 38.667 0 0 0-.614 7.054c-.015 2.382.19 4.761.614 7.106a3.707 3.707 0 0 0 2.586 2.56c2.294.614 11.467.614 11.467.614s9.173 0 11.467-.614a3.707 3.707 0 0 0 2.586-2.666c.417-2.31.622-4.653.614-7a38.67 38.67 0 0 0-.614-7.107Z"
    />
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.667}
      d="m13 20.027 7.667-4.36L13 11.307v8.72Z"
    />
  </svg>
);
export default Youtube;
