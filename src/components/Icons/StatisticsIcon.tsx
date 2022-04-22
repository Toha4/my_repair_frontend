import React from 'react';
import { Icon, IconProps } from '@chakra-ui/icons'


const StatisticsIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <svg viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_25_70)">
        <path d="M2.66754 -1V28C2.66754 29.6569 4.01069 31 5.66754 31H34.6675" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10.1675 13H7.16754V25H10.1675V13Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16.1675 6H13.1675V25H16.1675V6Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22.1675 17H19.1675V25H22.1675V17Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M28.1675 9H25.1675V25H28.1675V9Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_25_70">
          <rect width="32" height="32" fill="white" transform="translate(0.167542)" />
        </clipPath>
      </defs>
    </svg>
  </Icon>
);

export default StatisticsIcon;