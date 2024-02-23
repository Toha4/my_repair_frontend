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
import { Html5QrcodeCameraScanConfig, Html5QrcodeScanner } from "html5-qrcode";

interface IQrCodeCheckScaner {
  qrCodeScanerSuccess: (decodedText: string) => void;
}

const QrCodeCheckScaner: React.FC<IQrCodeCheckScaner> = ({ qrCodeScanerSuccess }) => {
  const [isEnableScaner, setIsEnableScaner] = React.useState<boolean>(false);

  React.useEffect(() => {
    const config: Html5QrcodeCameraScanConfig = { fps: 10, qrbox: { width: 200, height: 200 } };
    const scaner = new Html5QrcodeScanner("qrCodeReader", config, undefined);

    const qrCodeSuccess = (decodedText: string) => {
      qrCodeScanerSuccess(decodedText);
      setIsEnableScaner(false);
      scaner.clear()
    };

    if (isEnableScaner) {
      scaner.render(qrCodeSuccess, undefined)
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
          <Button variant="brandOutline" onClick={() => setIsEnableScaner(!isEnableScaner)}>
            Scan QR-code
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton onClick={() => setIsEnableScaner(false)}/>
          <PopoverHeader>Scan the QR code from the check</PopoverHeader>
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
