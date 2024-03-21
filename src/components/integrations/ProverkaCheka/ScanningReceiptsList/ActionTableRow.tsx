import React from "react";
import useTranslation from "next-translate/useTranslation";
import { Flex, IconButton, Tooltip } from "@chakra-ui/react";

import style from "../../Integrations.module.scss";
import { DeleteIcon, ReceiptIcon } from "../../../Icons";
import IconButtonOpenReceipt from "./IconButtonOpenReceipt";

interface IActionTableRow {
  id: number;
  onClickDelete: Function;
}

const ActionTableRow: React.FC<IActionTableRow> = ({ id, onClickDelete }) => {
  const { t } = useTranslation("integrations");

  const size_icon = { w: "24px", h: "24px" };

  return (
    <Flex justifyContent="end">
      <IconButtonOpenReceipt id={id} />
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
