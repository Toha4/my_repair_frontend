import { AxiosInstance } from "axios";
import {
  ProverkaChekaIntegrationSettingsType,
  ProverkaChekaIntegrationSettingsUpdateType,
  ReceiptListType,
  ReceiptType,
} from "./types";
import { Paginated } from "../../types/paginated";

export const ProverkaChekaIntegrationApi = (instance: AxiosInstance) => ({
  async getIntegrationSettings() {
    const { data } = await instance.get<ProverkaChekaIntegrationSettingsType>("/api/proverka_cheka/integration/");
    return data;
  },
  async updateIntegrationSettings(integrationSettings: ProverkaChekaIntegrationSettingsUpdateType) {
    const { data } = await instance.patch<
      ProverkaChekaIntegrationSettingsType,
      { data: ProverkaChekaIntegrationSettingsType }
    >(`/api/proverka_cheka/integration/`, integrationSettings);
    return data;
  },
  async getReceiptByQrRow(qrRaw: string) {
    const { data } = await instance.get<ReceiptType>("/api/proverka_cheka/proverka_cheka_by_qrraw/", {
      params: { qr_raw: qrRaw },
    });
    return data;
  },
  async getAllScannedReceipts(params = {}) {
    const { data } = await instance.get<Paginated<ReceiptListType>>("/api/proverka_cheka/receipt_scanning/", { params });
    return data;
  },
  async getReceipt(id: number) {
    const { data } = await instance.get<ReceiptType>(`/api/proverka_cheka/receipt_scanning/${id}`);
    return data;
  },
  removeReceipt(id: number) {
    return instance.delete(`/api/proverka_cheka/receipt_scanning/${id}`);
  },
});
