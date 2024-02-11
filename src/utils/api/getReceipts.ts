import { AxiosInstance } from "axios";
import { ReceiptsTypes } from "./types";

export const GetReceiptsApi = (instance: AxiosInstance) => ({
  async getReceiptByQrRow(qrRaw: string) {
    const { data } = await instance.get<ReceiptsTypes>("/api/get_receipts/get_receipts_by_qrraw/", {
      params: { qr_raw: qrRaw },
    });
    return data;
  },
});
