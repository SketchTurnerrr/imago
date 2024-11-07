import React from "react";

export const CrossIcon = (props: any) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth="1.5"
      {...props} // Spread props to allow customization
    >
      <rect width="24" height="24" fill="none" />
      <path
        d="M14 22H10V11H5V8H10V3H14V8H19V11H14V22Z"
        stroke="currentColor"
        strokeLinejoin="round"
      />
    </svg>
  );
};
