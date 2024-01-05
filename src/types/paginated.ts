export interface PaginatedLinks {
  next: string | null;
  previous: string | null;
}

export interface PaginatedNumbers {
  current:  number;
  previous: number | null;
  next: number | null;
}

export interface Paginated<T> {
  links: PaginatedLinks;
  numbers: PaginatedNumbers;
  count: number;
  page_size: number;
  page_count: number;
  results: T[];
}