import React from "react";
import { Icon, IconProps } from "@chakra-ui/icons";

const LinkIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_936_1153)">
        <path
          d="M8.98148 5.27778V7H4V17.5H15V12.6852H16.3889V18.2407C16.3889 18.4863 16.2913 18.7218 16.1177 18.8955C15.944 19.0691 15.7085 19.1667 15.463 19.1667H3.42593C3.18036 19.1667 2.94484 19.0691 2.7712 18.8955C2.59755 18.7218 2.5 18.4863 2.5 18.2407V6.2037C2.5 5.95813 2.59755 5.72262 2.7712 5.54898C2.94484 5.37533 3.18036 5.27778 3.42593 5.27778H8.98148ZM19.1667 2.5V9.90741H17.3148V5.66019L10.0991 12.8769L8.78981 11.5676L16.0046 4.35185H11.7593V2.5H19.1667Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_936_1153">
          <rect width="20" height="20" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  </Icon>
);

export default LinkIcon;
