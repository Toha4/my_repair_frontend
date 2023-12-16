import moment from "moment";

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function stringToDate(string: string): Date {
  const date = moment(string, "DD.MM.YYYY");
  return date.toDate();
}

export function sortByName(a: any, b: any) {
  return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
}