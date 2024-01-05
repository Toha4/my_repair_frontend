import { AxiosInstance } from "axios";
import { PurchasePositionTypes } from "./types";
import { Paginated } from "../../types/paginated";

export const PurchaseApi = (instance: AxiosInstance) => ({
  async getAllByPosition(params = {}) {
    const { data } = await instance.get<Paginated<PurchasePositionTypes>>("/api/purchases/position/", { params });
    return data;
  },
  async getAllByChecks() {},
});
