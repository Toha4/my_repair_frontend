import React from "react";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import style from "./ModalForm.module.scss";


interface IModalForm {
  children: React.ReactNode;
  isOpen: boolean;
  header: string;
  onClose(): void;
  onOk(): void;
  okText?: string;
};

const ModalForm: React.FC<IModalForm> = ({ children, isOpen, header, onClose, onOk, okText }) => {


  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent className={style.modalContent}>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton className={style.closeButton} />
        <ModalBody className={style.modalBody}>
          {children}
        </ModalBody>

        <ModalFooter>
          <Button type="submit" variant="brandSolid" onClick={onOk}>{okText ? okText : "Save"}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalForm;
