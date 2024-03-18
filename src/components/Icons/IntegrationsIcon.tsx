import React from "react";
import { Icon, IconProps } from "@chakra-ui/icons";

const IntegrationsIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M32 6.216C32 3.27467 29.608 0.882667 26.6667 0.882667C23.7253 0.882667 21.3333 3.27467 21.3333 6.216C21.3333 8.69333 23.04 10.764 25.3333 11.36V22.216C25.3333 22.9507 24.7347 23.5493 24 23.5493H17.3387L20.276 20.612L18.3907 18.7267L14.0493 23.068C13.0173 24.1013 13.0173 25.784 14.0493 26.8173L18.3907 31.1587L20.276 29.2733L17.204 26.216H24C26.2053 26.216 28 24.4213 28 22.216V11.36C30.2933 10.764 32 8.69333 32 6.216ZM13.5493 12.432L17.8907 8.092C18.924 7.05867 18.924 5.376 17.8907 4.34267L13.5493 0L11.664 1.88533L14.676 4.88267H8C5.79467 4.88267 4 6.67733 4 8.88267V19.7387C1.70667 20.3347 0 22.4053 0 24.8827C0 27.824 2.392 30.216 5.33333 30.216C8.27467 30.216 10.6667 27.824 10.6667 24.8827C10.6667 22.4053 8.96 20.3347 6.66667 19.7387V8.88267C6.66667 8.148 7.26533 7.54933 8 7.54933H14.66L11.6627 10.5467L13.5493 12.432Z"
        fill="currentColor"
      />
    </svg>
  </Icon>
);

export default IntegrationsIcon;