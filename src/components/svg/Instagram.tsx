import { SVGProps } from "react";
const Instagram = (props: SVGProps<SVGSVGElement>) => (
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
      d="M22.667 2.667H9.333a6.667 6.667 0 0 0-6.666 6.666v13.334a6.667 6.667 0 0 0 6.666 6.666h13.334a6.667 6.667 0 0 0 6.666-6.666V9.333a6.667 6.667 0 0 0-6.666-6.666Z"
    />
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.667}
      d="M21.333 15.16a5.333 5.333 0 1 1-10.55 1.565 5.333 5.333 0 0 1 10.55-1.565ZM23.333 8.667h.014"
    />
  </svg>
);
export default Instagram;
