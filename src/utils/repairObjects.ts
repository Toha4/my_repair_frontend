import { IUser, RepairObjectTypes } from "../redux/types";


export function isCurrentLandMode (user: IUser | null | undefined): boolean {
  if (user?.settings?.current_repair_object_type === RepairObjectTypes.LAND) {
    return true
  }

  return false
}