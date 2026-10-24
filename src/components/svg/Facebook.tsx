import { SVGProps } from "react";
const Facebook = (props: SVGProps<SVGSVGElement>) => (
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
      d="M24 2.667h-4a6.667 6.667 0 0 0-6.667 6.666v4h-4v5.334h4v10.666h5.334V18.667h4L24 13.333h-5.333v-4A1.333 1.333 0 0 1 20 8h4V2.667Z"
    />
  </svg>
);
export default Facebook;
