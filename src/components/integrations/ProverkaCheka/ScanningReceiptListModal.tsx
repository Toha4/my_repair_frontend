import React from "react";
import useTranslation from "next-translate/useTranslation";

import { IModalSelect } from "../../common/forms/types";
import ModalForm from "../../common/ModalForm";
import ScanningReceiptsList from "./ScanningReceiptsList";
import { RowSelectionState } from "@tanstack/react-table";
import { useToast } from "@chakra-ui/react";

const ScanningReceiptListModal: React.FC<IModalSelect> = ({ isOpen, onClose, onOk }) => {
  const { t } = useTranslation();
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  const toast = useToast();

  const handleSelect = () => {
    if (Object.keys(rowSelection).length === 0) {
      toast({ title: t("integrations:proverkaChekaReceiptNotSelected"), status: "warning" });
      return;
    }

    const selectedReceiptId = Number(Object.keys(rowSelection)[0]);

    if (onOk) {
      onOk(selectedReceiptId);
      onClose();
    }
  };

  return (
    <ModalForm
      isOpen={isOpen}
      header={t("integrations:proverkaChekaReceiptSelectTitle")}
      onClose={onClose}
      okText={t("common:actionOnSelect")}
      onOk={handleSelect}
      maxWidth="900px"
    >
      <ScanningReceiptsList
        setRowSelection={setRowSelection}
        rowSelection={rowSelection}
        selectMode
      ></ScanningReceiptsList>
    </ModalForm>
  );
};

export default ScanningReceiptListModal;
