import React from "react";
import { Icon, IconProps } from "@chakra-ui/icons";

const LogoutIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <svg viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_44_26)">
        <path
          d="M14.0423 20.78L15.9577 22.6667L22.7259 16L15.9577 9.33333L14.0423 11.22L17.5415 14.6667H4.45178V17.3333H17.5415L14.0423 20.78ZM26.11 4H7.15906C5.66329 4 4.45178 5.19333 4.45178 6.66667V12H7.15906V6.66667H26.11V25.3333H7.15906V20H4.45178V25.3333C4.45178 26.8067 5.66329 28 7.15906 28H26.11C27.6058 28 28.8173 26.8067 28.8173 25.3333V6.66667C28.8173 5.19333 27.6058 4 26.11 4Z"
          fill="#4A5568"
        />
      </g>
      <defs>
        <clipPath id="clip0_44_26">
          <rect
            width="32.4873"
            height="32"
            fill="white"
            transform="translate(0.390869)"
          />
        </clipPath>
      </defs>
    </svg>
  </Icon>
);

export default LogoutIcon;
