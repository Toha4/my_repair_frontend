import React from "react";
import useTranslation from "next-translate/useTranslation";
import { Flex, IconButton, Tooltip } from "@chakra-ui/react";

import style from "../../expenses.module.scss";
import { EditCheckIcon, EditIcon, LinkIcon } from "../../../Icons";

interface IActionTableRow {
  id: number;
  cash_check_id: number;
  link: string;
  onClickEditPosition: Function;
  onClickEditCheck: Function;
}

const ActionTableRow: React.FC<IActionTableRow> = ({
  id,
  cash_check_id,
  link,
  onClickEditPosition,
  onClickEditCheck,
}) => {
  const { t, lang } = useTranslation("expenses");

  const size_icon = { w: "24px", h: "24px" };

  return (
    <Flex justifyContent="end">
      {!!link && (
        <Tooltip label={t("actionOpenLink")} closeOnScroll>
          <a target="_blank" href={link}>
            <IconButton
              className={style.iconActionButton}
              aria-label={t("actionOpenLink")}
              variant="iconButton"
              icon={<LinkIcon {...size_icon} />}
            />
          </a>
        </Tooltip>
      )}
      <Tooltip label={t("actionEditPosition")} closeOnScroll offset={lang == "ru" ? [-25, 0] : undefined}>
        <IconButton
          className={style.iconActionButton}
          ml="8px"
          aria-label={t("actionEditPosition")}
          variant="iconButton"
          icon={<EditIcon {...size_icon} />}
          onClick={() => onClickEditPosition(id)}
        />
      </Tooltip>
      <Tooltip label={t("actionEditCheck")} closeOnScroll offset={lang == "ru" ? [-30, 0] : undefined}>
        <IconButton
          className={style.iconActionButton}
          ml="8px"
          aria-label={t("actionEditCheck")}
          variant="iconButton"
          icon={<EditCheckIcon {...size_icon} />}
          onClick={() => onClickEditCheck(cash_check_id)}
        />
      </Tooltip>
    </Flex>
  );
};

export default ActionTableRow;
