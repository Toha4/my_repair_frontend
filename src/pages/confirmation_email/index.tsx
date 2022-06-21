import React from "react";
import useTranslation from "next-translate/useTranslation";
import { Text } from "@chakra-ui/react";
import LoginLayout from "../../components/layouts/LoginLayout";
import { useAppSelector } from "../../redux/hooks";
import { OurStore } from "../../redux/store";
import { useRouter } from "next/router";


const ConfirmationEmailPage: React.FC = () => {
  const { t } = useTranslation("login");
  const { register_success, user } = useAppSelector((state: OurStore) => state.authReducer);

  const router = useRouter();
  if (typeof window !== "undefined" && !register_success) {
    router.push("/login");
  }

  return (
    <LoginLayout>
      <Text fontSize='2xl'>
        {t("confirmationEmail", { email: user?.email})}
      </Text>
    </LoginLayout>
  );
};

export default ConfirmationEmailPage;