import React from 'react';
import { Icon, IconProps } from '@chakra-ui/icons'


const StarIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 2.5C5.86417 2.5 2.5 5.865 2.5 10C2.5 14.135 5.86417 17.5 10 17.5C14.1358 17.5 17.5 14.135 17.5 10C17.5 5.865 14.1358 2.5 10 2.5ZM10 15.8333C6.78417 15.8333 4.16667 13.2167 4.16667 10C4.16667 6.78333 6.78417 4.16667 10 4.16667C13.2158 4.16667 15.8333 6.78333 15.8333 10C15.8333 13.2167 13.2158 15.8333 10 15.8333ZM10.5892 10L12.7942 7.795C12.9558 7.63333 12.9558 7.36833 12.7942 7.20583C12.6317 7.04417 12.3667 7.04417 12.205 7.20583L10 9.41083L7.795 7.205C7.6325 7.04333 7.3675 7.04333 7.20583 7.205C7.04333 7.3675 7.04333 7.6325 7.20583 7.79417L9.41083 10L7.20583 12.205C7.04333 12.3675 7.04333 12.6325 7.20583 12.7942C7.28667 12.8758 7.39333 12.9167 7.5 12.9167C7.60667 12.9167 7.71333 12.8758 7.795 12.795L10 10.5892L12.205 12.7942C12.2867 12.8758 12.3933 12.9167 12.5 12.9167C12.6067 12.9167 12.7133 12.8758 12.795 12.795C12.9567 12.6333 12.9567 12.3683 12.795 12.2058L10.5892 10Z" fill="currentColor" />
    </svg>
  </Icon>
);

export default StarIcon;