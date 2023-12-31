import React from "react";
import useTranslation from "next-translate/useTranslation";
import { Flex, IconButton, Tooltip } from "@chakra-ui/react";
import { StarIcon, StarFillIcon, EditIcon, DeleteIcon } from "../Icons";
import style from "./TableSetting.module.scss";

interface IActionTableRow {
  id: number;
  is_active?: boolean;
  onClickActive?: Function;
  onClickEdit: Function;
  onClickDelete: Function;
}

const ActionTableRow: React.FC<IActionTableRow> = ({
  id,
  is_active,
  onClickActive,
  onClickEdit,
  onClickDelete,
}) => {
  const { t } = useTranslation("settings");

  const size_icon = { w: "24px", h: "24px" };

  return (
    <Flex>
      {onClickActive &&
        (is_active ? (
          <StarFillIcon {...size_icon} />
        ) : (
          <Tooltip label={t("actionSetActive")}>
            <IconButton
              className={style.iconActionButton}
              aria-label={t("actionSetActive")}
              variant="iconButton"
              icon={<StarIcon {...size_icon} />}
              onClick={() => onClickActive(id)}
            />
          </Tooltip>
        ))}
      <Tooltip label={t("actionEdit")}>
        <IconButton
          className={style.iconActionButton}
          ml="8px"
          aria-label={t("actionEdit")}
          variant="iconButton"
          icon={<EditIcon {...size_icon} />}
          onClick={() => onClickEdit(id)}
        />
      </Tooltip>
      <Tooltip label={t("actionDelete")}>
        <IconButton
          className={style.iconActionButton}
          ml="8px"
          aria-label={t("actionDelete")}
          variant="iconButton"
          icon={<DeleteIcon {...size_icon} />}
          onClick={() => onClickDelete(id)}
        />
      </Tooltip>
    </Flex>
  );
};

export default ActionTableRow;
