import React from 'react';
import { IIconProps } from "../../types/Icon"
import { NavSize } from '../Sidebar';
import style from "./Icons.module.scss"

interface IHideSidebarIcon extends IIconProps {
  navSize: NavSize,
}

const HideSidebarIcon: React.FC<IHideSidebarIcon> = ({ colorMode, navSize }) => (
  <svg className={colorMode == "dark" ? style.iconButtonDarkMode : style.iconButtonLightMode} width="32px" height="32px" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32px" height="32px" rx="3" />
    {navSize == NavSize.SMALL
      ? <path d="M8.8541 9.77786C8.74251 9.77628 8.63172 9.79689 8.52817 9.8385C8.42462 9.88012 8.33037 9.94189 8.2509 10.0202C8.17143 10.0986 8.10832 10.192 8.06525 10.2949C8.02218 10.3979 8 10.5084 8 10.62C8 10.7316 8.02218 10.842 8.06525 10.945C8.10832 11.048 8.17143 11.1413 8.2509 11.2197C8.33037 11.298 8.42462 11.3598 8.52817 11.4014C8.63172 11.443 8.74251 11.4636 8.8541 11.4621H24.012C24.1236 11.4636 24.2344 11.443 24.3379 11.4014C24.4415 11.3598 24.5357 11.298 24.6152 11.2197C24.6947 11.1413 24.7578 11.048 24.8008 10.945C24.8439 10.842 24.8661 10.7316 24.8661 10.62C24.8661 10.5084 24.8439 10.3979 24.8008 10.2949C24.7578 10.192 24.6947 10.0986 24.6152 10.0202C24.5357 9.94189 24.4415 9.88012 24.3379 9.8385C24.2344 9.79689 24.1236 9.77628 24.012 9.77786H8.8541ZM8.8541 14.8305C8.74251 14.8289 8.63172 14.8495 8.52817 14.8911C8.42462 14.9327 8.33037 14.9945 8.2509 15.0729C8.17143 15.1512 8.10832 15.2446 8.06525 15.3476C8.02218 15.4505 8 15.561 8 15.6726C8 15.7842 8.02218 15.8947 8.06525 15.9976C8.10832 16.1006 8.17143 16.194 8.2509 16.2723C8.33037 16.3507 8.42462 16.4124 8.52817 16.454C8.63172 16.4957 8.74251 16.5163 8.8541 16.5147H24.012C24.1236 16.5163 24.2344 16.4957 24.3379 16.454C24.4415 16.4124 24.5357 16.3507 24.6152 16.2723C24.6947 16.194 24.7578 16.1006 24.8008 15.9976C24.8439 15.8947 24.8661 15.7842 24.8661 15.6726C24.8661 15.561 24.8439 15.4505 24.8008 15.3476C24.7578 15.2446 24.6947 15.1512 24.6152 15.0729C24.5357 14.9945 24.4415 14.9327 24.3379 14.8911C24.2344 14.8495 24.1236 14.8289 24.012 14.8305H8.8541ZM8.8541 19.8831C8.74251 19.8815 8.63172 19.9022 8.52817 19.9438C8.42462 19.9854 8.33037 20.0472 8.2509 20.1255C8.17143 20.2039 8.10832 20.2972 8.06525 20.4002C8.02218 20.5031 8 20.6136 8 20.7252C8 20.8368 8.02218 20.9473 8.06525 21.0503C8.10832 21.1532 8.17143 21.2466 8.2509 21.3249C8.33037 21.4033 8.42462 21.4651 8.52817 21.5067C8.63172 21.5483 8.74251 21.5689 8.8541 21.5673H24.012C24.1236 21.5689 24.2344 21.5483 24.3379 21.5067C24.4415 21.4651 24.5357 21.4033 24.6152 21.3249C24.6947 21.2466 24.7578 21.1532 24.8008 21.0503C24.8439 20.9473 24.8661 20.8368 24.8661 20.7252C24.8661 20.6136 24.8439 20.5031 24.8008 20.4002C24.7578 20.2972 24.6947 20.2039 24.6152 20.1255C24.5357 20.0472 24.4415 19.9854 24.3379 19.9438C24.2344 19.9022 24.1236 19.8815 24.012 19.8831H8.8541Z" />
      : <path d="M11.1168 14.7501H26.5635V17.2501H11.1168L17.9239 23.9551L16.1295 25.7226L6.25891 16.0001L16.1295 6.27756L17.9239 8.04506L11.1168 14.7501Z" />
    }
  </svg>
);

export default HideSidebarIcon;