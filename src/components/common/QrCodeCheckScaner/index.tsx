import React from "react";
import style from "./QrCodeCheckScaner.module.scss";
import {
  Box,
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { Html5QrcodeCameraScanConfig, Html5QrcodeScanner } from "html5-qrcode";
import { QrCodeIcon } from "../../Icons";
import useTranslation from "next-translate/useTranslation";

interface IQrCodeCheckScaner {
  qrCodeScanerSuccess: (decodedText: string) => void;
  showOnlyIcon?: boolean;
  isLoading?: boolean;
  widthMenuButtom?: boolean;
  isDisabled?: boolean;
}

const QrCodeCheckScaner: React.FC<IQrCodeCheckScaner> = ({
  qrCodeScanerSuccess,
  showOnlyIcon = false,
  isLoading = false,
  widthMenuButtom = false,
  isDisabled = false,
}) => {
  const { t } = useTranslation("common");

  const [isEnableScaner, setIsEnableScaner] = React.useState<boolean>(false);

  React.useEffect(() => {
    const config: Html5QrcodeCameraScanConfig = { fps: 10, qrbox: { width: 200, height: 200 } };
    const scaner = new Html5QrcodeScanner("qrCodeReader", config, undefined);

    const qrCodeSuccess = (decodedText: string) => {
      qrCodeScanerSuccess(decodedText);
      setIsEnableScaner(false);
      scaner.clear();
    };

    if (isEnableScaner) {
      scaner.render(qrCodeSuccess, undefined);
    } else {
      scaner.clear();
    }

    return () => {
      scaner.clear();
    };
  }, [isEnableScaner]);

  return (
    <React.Fragment>
      <Popover isOpen={isEnableScaner}>
        <PopoverTrigger>
          <Button
            className={widthMenuButtom ? style.buttonQrScanner : undefined}
            variant="brandSolid"
            isLoading={isLoading}
            onClick={() => setIsEnableScaner(!isEnableScaner)}
            isDisabled={isDisabled}
          >
            <Flex alignItems="center" gap=".2rem">
              <QrCodeIcon w="24px" h="24px" marginBottom="-6px" marginRight={showOnlyIcon ? "-5px" : "-2px"} />
              {!showOnlyIcon && <span>{t("ScanQrCode")}</span>}
            </Flex>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton onClick={() => setIsEnableScaner(false)} />
          <PopoverHeader>{t("ScanQrCodeTitle")}</PopoverHeader>
          <PopoverBody>
            <Box>
              <div id="qrCodeReader"></div>
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </React.Fragment>
  );
};

export default QrCodeCheckScaner;
