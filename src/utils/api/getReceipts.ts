import { AxiosInstance } from "axios";
import { ReceiptsTypes } from "./types";

export const GetReceiptsApi = (instance: AxiosInstance) => ({
  async getReceiptByQrRow(qrRaw: string) {
    const { data } = await instance.get<ReceiptsTypes>("/api/proverka_cheka/proverka_cheka_by_qrraw/", {
      params: { qr_raw: qrRaw },
    });
    return data;
  },
});
