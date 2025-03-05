import React from "react";

type IconProps = {
  color?: string;
  size?: string | number;
} & React.SVGAttributes<SVGElement>;

const PhoneIncomingIcon: React.FC<IconProps> = ({
  size = "24",
  color = "currentColor",
  ...attributes
}) => {
  return (
    // <svg
    //   width={size}
    //   height={size}
    //   viewBox="0 0 20 20"
    //   fill="none"
    //   xmlns="http://www.w3.org/2000/svg"
    //   {...attributes}
    // >
    //   <path
    //     d="M2.5 10C2.5 10 5.22727 4.58337 10 4.58337C14.7727 4.58337 17.5 10 17.5 10C17.5 10 14.7727 15.4167 10 15.4167C5.22727 15.4167 2.5 10 2.5 10Z"
    //     stroke={color}
    //     strokeWidth="1.5"
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //   />
    //   <path
    //     d="M9.99965 12.0739C11.145 12.0739 12.0735 11.1454 12.0735 10C12.0735 8.85465 11.145 7.92615 9.99965 7.92615C8.85428 7.92615 7.92578 8.85465 7.92578 10C7.92578 11.1454 8.85428 12.0739 9.99965 12.0739Z"
    //     stroke={color}
    //     strokeWidth="1.5"
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //   />
    // </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...attributes}
    >
      <polyline points="16 2 16 8 22 8"></polyline>
      <line x1="22" y1="2" x2="16" y2="8"></line>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  );
};

export default PhoneIncomingIcon;
