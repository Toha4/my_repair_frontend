import { AxiosInstance } from "axios";
import { CheckType, PaginatedPurchaseWithTotal, PurchasePositionTypes } from "./types";


export const PurchaseApi = (instance: AxiosInstance) => ({
  async getAllByPosition(params = {}) {
    const { data } = await instance.get<PaginatedPurchaseWithTotal<PurchasePositionTypes>>("/api/purchases/position/", { params });
    return data;
  },
  async getAllByChecks() {},
  async getCheck(id: number) {
    const { data } = await instance.get<CheckType>(`/api/purchases/cash_check/${id}`);
    return data;
  },
  async createCheck(check: CheckType) {
    const { data } = await instance.post<CheckType, { data: CheckType }>("/api/purchases/cash_check/", check);
    return data;
  },
  async updateCheck(id: number, check: CheckType) {
    const { data } = await instance.put<CheckType, { data: CheckType }>(`api/purchases/cash_check/${id}`, check);
    return data;
  },
});
