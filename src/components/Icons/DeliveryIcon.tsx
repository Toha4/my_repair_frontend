import React from "react";
import { Icon, IconProps } from "@chakra-ui/icons";

const DeliveryIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.6792 9.53015L18.9775 7.2427C18.7288 6.4303 18.2509 5.72381 17.6116 5.2237C16.9723 4.72358 16.2043 4.4553 15.4167 4.45699H13.75C13.4185 4.45699 13.1005 4.60016 12.8661 4.855C12.6317 5.10984 12.5 5.45548 12.5 5.81587V15.328H1.25C1.08493 15.328 0.921499 15.3636 0.769131 15.4326C0.616764 15.5016 0.478481 15.6028 0.362265 15.7302C0.246049 15.8576 0.154202 16.0088 0.0920243 16.1751C0.0298467 16.3413 -0.00142942 16.5193 1.17283e-06 16.6987V18.5685C1.17283e-06 19.1692 0.219495 19.7452 0.610195 20.17C1.0009 20.5947 1.5308 20.8333 2.08333 20.8333C2.63587 20.8333 3.16577 20.5947 3.55647 20.17C3.94717 19.7452 4.16667 19.1692 4.16667 18.5685V18.0458H5V18.5685C5 19.1692 5.21949 19.7452 5.6102 20.17C6.0009 20.5947 6.5308 20.8333 7.08333 20.8333C7.63587 20.8333 8.16577 20.5947 8.55647 20.17C8.94717 19.7452 9.16667 19.1692 9.16667 18.5685V18.0458H14.1667V18.5685C14.1667 19.1692 14.3862 19.7452 14.7769 20.17C15.1676 20.5947 15.6975 20.8333 16.25 20.8333C16.8025 20.8333 17.3324 20.5947 17.7231 20.17C18.1138 19.7452 18.3333 19.1692 18.3333 18.5685V17.7396C18.8316 17.4819 19.2526 17.0762 19.5475 16.5692C19.8425 16.0623 19.9994 15.4749 20 14.8751V11.6808C20.0004 10.9498 19.892 10.2236 19.6792 9.53015ZM15.4167 7.17475C15.6792 7.17459 15.9351 7.26429 16.1481 7.43112C16.3611 7.59796 16.5204 7.83346 16.6033 8.10423L17.305 10.3917C17.4336 10.8071 17.4994 11.2425 17.5 11.6808V11.7044H15V7.17475H15.4167ZM1.25 13.5162H9.58333C9.91485 13.5162 10.2328 13.373 10.4672 13.1182C10.7016 12.8633 10.8333 12.5177 10.8333 12.1573V4.90995C10.8322 3.82913 10.4368 2.79292 9.73377 2.02866C9.03074 1.2644 8.07756 0.834512 7.08333 0.833313H3.75C2.75578 0.834512 1.80259 1.2644 1.09957 2.02866C0.396546 2.79292 0.00110403 3.82913 1.17283e-06 4.90995V12.1573C1.17283e-06 12.5177 0.131697 12.8633 0.366118 13.1182C0.600538 13.373 0.918481 13.5162 1.25 13.5162ZM2.5 4.90995C2.5 4.54956 2.6317 4.20392 2.86612 3.94908C3.10054 3.69424 3.41848 3.55107 3.75 3.55107H7.08333C7.41486 3.55107 7.7328 3.69424 7.96722 3.94908C8.20164 4.20392 8.33333 4.54956 8.33333 4.90995V10.7984H6.66667V6.72179C6.66667 6.3614 6.53497 6.01576 6.30055 5.76092C6.06613 5.50608 5.74819 5.36291 5.41667 5.36291C5.08515 5.36291 4.7672 5.50608 4.53278 5.76092C4.29836 6.01576 4.16667 6.3614 4.16667 6.72179V10.7984H2.5V4.90995Z"
        fill="currentColor"
      />
    </svg>
  </Icon>
);

export default DeliveryIcon;