import React from "react";
import useTranslation from "next-translate/useTranslation";
import style from "../../Integrations.module.scss";

import { Api } from "../../../../utils/api";
import { Box, Text, Stack, Skeleton, Flex, Tooltip } from "@chakra-ui/react";
import { IModalForm } from "../../../common/forms/types";
import { ReceiptType } from "../../../../utils/api/types";
import ModalForm from "../../../common/ModalForm";
import { LinkedLackObjectIcon } from "../../../Icons";

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
      header={!!receipt ? t("common:receiptFrom", { date: receipt?.date }) : t("common:receipt")}
      onClose={onClose}
      okText={t("common:actionClose")}
      onOk={onClose}
      maxWidth="640px"
    >
      {loading ? (
        <Stack gap="1rem">
          <Flex justifyContent="space-between">
            <Skeleton height="27px" width="12.4rem" marginRight=".5rem" />
            <Skeleton height="27px" width="12.4rem" marginLeft=".5rem" />
          </Flex>
          <Skeleton height="50vh" />
        </Stack>
      ) : (
        <>
          <Flex justifyContent="space-between" alignItems="center">
            {receipt?.shop_name ? (
              <Box marginRight=".5rem">{receipt?.shop_name}</Box>
            ) : (
              <Tooltip label={t("proverkaChekaShopNotLinked")} closeOnScroll>
                <Box>
                  <LinkedLackObjectIcon h="24px" w="24px" marginLeft=".2rem" />
                </Box>
              </Tooltip>
            )}

            <Box marginBottom="1rem" marginLeft=".5rem">
              {!!receipt && (
                <Text textAlign="end">
                  {`${t("common:added")}`}: {receipt?.created}
                </Text>
              )}
            </Box>
          </Flex>
          {receipt?.html && (
            <Box className={style.receiptContainer} dangerouslySetInnerHTML={{ __html: receipt.html }}></Box>
          )}
        </>
      )}
    </ModalForm>
  );
};

export default ReceiptModal;
