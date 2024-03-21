import React from "react";
import useTranslation from "next-translate/useTranslation";
import { IconButton, Tooltip, useDisclosure } from "@chakra-ui/react";

import style from "../../Integrations.module.scss";
import { ReceiptIcon } from "../../../Icons";
import ReceiptModal from "./ReceiptModal";

interface IIconButtonOpenReceipt {
  id: number;
  labelOpen?: string;
}

const IconButtonOpenReceipt: React.FC<IIconButtonOpenReceipt> = ({ id, labelOpen }) => {
  const { t } = useTranslation("integrations");

  const { isOpen: isOpenForm, onOpen: onOpenModal, onClose: onCloseForm } = useDisclosure();

  const size_icon = { w: "24px", h: "24px" };

  return (
    <>
      {isOpenForm && <ReceiptModal id={id} isOpen={isOpenForm} onClose={onCloseForm} />}

      <Tooltip label={!!labelOpen ? labelOpen : t("common:open")} closeOnScroll>
        <IconButton
          className={style.iconActionButton}
          ml="8px"
          aria-label={!!labelOpen ? labelOpen : t("common:open")}
          variant="iconButton"
          icon={<ReceiptIcon {...size_icon} />}
          onClick={() => onOpenModal()}
        />
      </Tooltip>
    </>
  );
};

export default IconButtonOpenReceipt;
