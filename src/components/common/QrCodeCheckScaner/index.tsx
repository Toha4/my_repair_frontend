import React from "react";
import {
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { Html5Qrcode, Html5QrcodeCameraScanConfig, Html5QrcodeResult } from "html5-qrcode";
import style from "./QrCodeCheckScaner.module.scss";

interface IQrCodeCheckScaner {
  qrCodeScanerSuccess: (decodedText: string) => void;
}

const QrCodeCheckScaner: React.FC<IQrCodeCheckScaner> = ({ qrCodeScanerSuccess }) => {
  const [isEnableScaner, setIsEnableScaner] = React.useState<boolean>(false);

  React.useEffect(() => {
    const config: Html5QrcodeCameraScanConfig = { fps: 10, qrbox: { width: 200, height: 200 } };
    const html5QrCode = new Html5Qrcode("qrCodeContainer");

    const qrScanerStop = () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode
          .stop()
          .then(() => console.log("Scaner stop"))
          .catch(() => console.log("Scaner error"));
      }
    };

    const qrCodeSuccess = (decodedText: string) => {
      qrCodeScanerSuccess(decodedText);
      setIsEnableScaner(false);
    };

    if (isEnableScaner) {
      html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccess, undefined);
    } else {
      qrScanerStop();
    }

    return () => {
      qrScanerStop();
    };
  }, [isEnableScaner]);

  return (
    <React.Fragment>
      <Popover isOpen={isEnableScaner} onClose={() => setIsEnableScaner(false)}>
        <PopoverTrigger>
          <Button variant="brandOutline" onClick={() => setIsEnableScaner(!isEnableScaner)}>
            Scan QR-code
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Scan the QR code from the check</PopoverHeader>
          <PopoverBody>
            <Box className={style.scaner}>
              <div id="qrCodeContainer"></div>
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </React.Fragment>
  );
};

export default QrCodeCheckScaner;
