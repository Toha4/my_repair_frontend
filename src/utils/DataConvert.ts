import moment from "moment";

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function stringToDate(string: string): Date {
  const date = moment(string, "MM.DD.YYYY");
  return date.toDate();
}