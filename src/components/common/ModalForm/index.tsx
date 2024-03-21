import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
} from "@chakra-ui/react";
import style from "./ModalForm.module.scss";

interface IModalForm {
  children: React.ReactNode;
  isOpen: boolean;
  header: string | React.ReactNode;
  onClose(): void;
  onOk(): void;
  okText?: string;
  isLoadingSubmitButton?: boolean;
  width?: string;
  maxWidth?: string;
  minWidth?: string;
  additionalFooter?: React.ReactElement;
}

const ModalForm: React.FC<IModalForm> = ({
  children,
  isOpen,
  header,
  onClose,
  onOk,
  okText,
  isLoadingSubmitButton,
  width,
  maxWidth,
  minWidth,
  additionalFooter,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className={style.modalContent} w={width} maxW={maxWidth} minW={minWidth}>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton className={style.closeButton} />
        <ModalBody className={style.modalBody}>{children}</ModalBody>

        <ModalFooter alignItems={{ base: "end", md: "center" }}>
          {additionalFooter && (
            <React.Fragment>
              {additionalFooter}
              <Spacer />
            </React.Fragment>
          )}

          <Button type="submit" variant="brandSolid" onClick={onOk} isLoading={isLoadingSubmitButton}>
            {okText ? okText : "Save"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalForm;
