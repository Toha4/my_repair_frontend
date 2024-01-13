import React from "react";
import { Icon, IconProps } from "@chakra-ui/icons";

const EditCheckIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.16669 3.33333H3.33335C2.89133 3.33333 2.4674 3.50893 2.15484 3.82149C1.84228 4.13405 1.66669 4.55797 1.66669 5V16.6667C1.66669 17.1087 1.84228 17.5326 2.15484 17.8452C2.4674 18.1577 2.89133 18.3333 3.33335 18.3333H15C15.442 18.3333 15.866 18.1577 16.1785 17.8452C16.4911 17.5326 16.6667 17.1087 16.6667 16.6667V10.8333"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.8457 15.5C4.88477 15.5 4.92383 15.4961 4.96289 15.4902L8.24805 14.9141C8.28711 14.9062 8.32422 14.8887 8.35156 14.8594L16.6309 6.58008C16.649 6.56201 16.6633 6.54055 16.6731 6.51692C16.6829 6.49329 16.688 6.46796 16.688 6.44238C16.688 6.4168 16.6829 6.39147 16.6731 6.36785C16.6633 6.34422 16.649 6.32276 16.6309 6.30469L13.3848 3.05664C13.3477 3.01953 13.2988 3 13.2461 3C13.1934 3 13.1445 3.01953 13.1074 3.05664L4.82812 11.3359C4.79883 11.3652 4.78125 11.4004 4.77344 11.4395L4.19727 14.7246C4.17827 14.8292 4.18505 14.9369 4.21704 15.0383C4.24904 15.1398 4.30526 15.2318 4.38086 15.3066C4.50977 15.4316 4.67188 15.5 4.8457 15.5ZM6.16211 12.0938L13.2461 5.01172L14.6777 6.44336L7.59375 13.5254L5.85742 13.832L6.16211 12.0938Z"
        fill="currentColor"
      />
    </svg>
  </Icon>
);

export default EditCheckIcon;