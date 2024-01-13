import React, { useContext, useRef, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react'
import useTranslation from "next-translate/useTranslation";


type UseModalShowReturnType = {
  show: boolean;
  setShow: (value: boolean) => void;
  onHide: () => void;
}

const useModalShow = (): UseModalShowReturnType => {
  const [show, setShow] = useState(false);

  const handleOnHide = () => {
    setShow(false);
  };

  return {
    show,
    setShow,
    onHide: handleOnHide,
  }
};

type ModalContextType = {
  showConfirmation: (message: string | JSX.Element) => Promise<boolean>;
};

type ConfirmationModalContextProviderProps = {
  children: React.ReactNode
};

const ConfirmationModalContext = React.createContext<ModalContextType>({} as ModalContextType);

const ConfirmationModalContextProvider: React.FC<ConfirmationModalContextProviderProps> = (props) => {
  const { t } = useTranslation("settings");
  const { setShow, show, onHide } = useModalShow();
  const [content, setContent] = useState<{ message: string | JSX.Element } | null>();
  const resolver = useRef<Function>();

  const handleShow = (message: string | JSX.Element): Promise<boolean> => {
    setContent({
      message
    });
    setShow(true);
    return new Promise(function (resolve) {
      resolver.current = resolve;
    });
  };

  const modalContext: ModalContextType = {
    showConfirmation: handleShow
  };

  const handleOk = () => {
    resolver.current && resolver.current(true);
    onHide();
  };

  const handleCancel = () => {
    resolver.current && resolver.current(false);
    onHide();
  };

  return (
    <ConfirmationModalContext.Provider value={modalContext}>
      {props.children}

      {content &&
        <Modal isOpen={show} onClose={onHide}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{t("common:confirmationAction")}</ModalHeader>
            <ModalCloseButton borderRadius="brand"/>
            <ModalBody>{content.message}</ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleCancel}>
                {t("common:confirmationCancel")}
              </Button>
              <Button variant="ghost" onClick={handleOk}>
                {t("common:confirmationYes")}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>}
    </ConfirmationModalContext.Provider>
  )
};

const useConfirmationModalContext = (): ModalContextType => useContext(ConfirmationModalContext);

export {
  useModalShow,
  useConfirmationModalContext,
}

export default ConfirmationModalContextProvider;