import React from "react";
import useTranslation from "next-translate/useTranslation";
import style from "../../Integrations.module.scss";

import { Api } from "../../../../utils/api";
import { Box, Text, Stack, Skeleton } from "@chakra-ui/react";
import { IModalForm } from "../../../common/forms/types";
import { ReceiptType } from "../../../../utils/api/types";
import ModalForm from "../../../common/ModalForm";

const ReceiptModal: React.FC<IModalForm> = ({ id, isOpen, onClose }) => {
  const { t } = useTranslation("integrations");

  const [receipt, setReceipt] = React.useState<ReceiptType | null>(null);

  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (id) {
      setLoading(true);

      const fetchData = async () => {
        const result = await Api().proverkaChekaIntegration.getReceipt(id);
        setReceipt(result);

        setLoading(false);
      };

      fetchData();
    }
  }, []);

  return (
    <ModalForm
      isOpen={isOpen}
      header={!!receipt ? t("proverkaChekaReceiptFrom", { date: receipt?.date }) : t("proverkaChekaReceipt")}
      onClose={onClose}
      okText={t("common:actionClose")}
      onOk={onClose}
      maxWidth="640px"
    >
      {loading ? (
        <Stack gap="1rem">
          <Skeleton height="27px" width="12.4rem" marginLeft="auto" />
          <Skeleton height="50vh" />
        </Stack>
      ) : (
        <>
          <Box marginBottom="1rem">
            {!!receipt && (
              <Text textAlign="end">
                {`${t("proverkaChekaAdded")}`}: {receipt?.created}
              </Text>
            )}
          </Box>
          {receipt?.html && (
            <Box className={style.receiptContainer} dangerouslySetInnerHTML={{ __html: receipt.html }}></Box>
          )}
        </>
      )}
    </ModalForm>
  );
};

export default ReceiptModal;
