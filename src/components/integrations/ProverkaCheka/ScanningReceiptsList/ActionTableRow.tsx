import React from "react";
import useTranslation from "next-translate/useTranslation";
import { Flex, IconButton, Tooltip } from "@chakra-ui/react";

import style from "../../Integrations.module.scss";
import { DeleteIcon, ReceiptIcon } from "../../../Icons";

interface IActionTableRow {
  id: number;
  onClickOpenReceipt: Function;
  onClickDelete: Function;
}

const ActionTableRow: React.FC<IActionTableRow> = ({ id, onClickOpenReceipt, onClickDelete }) => {
  const { t } = useTranslation("integrations");

  const size_icon = { w: "24px", h: "24px" };

  return (
    <Flex justifyContent="end">
      <Tooltip label={t("proverkaChekaView")} closeOnScroll>
        <IconButton
          className={style.iconActionButton}
          ml="8px"
          aria-label={t("proverkaChekaView")}
          variant="iconButton"
          icon={<ReceiptIcon {...size_icon} />}
          onClick={() => onClickOpenReceipt(id)}
        />
      </Tooltip>
      <Tooltip label={t("common:actionDelete")} closeOnScroll>
        <IconButton
          className={style.iconActionButton}
          ml="8px"
          aria-label={t("common:actionDelete")}
          variant="iconButton"
          icon={<DeleteIcon {...size_icon} />}
          onClick={() => onClickDelete(id)}
        />
      </Tooltip>
    </Flex>
  );
};

export default ActionTableRow;
