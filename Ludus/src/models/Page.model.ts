
export interface PageFilter {
  items_per_page: number;
  page: number;
}

export interface Page<T> {
  items: T[],
  items_per_page: number;
  page: number;
}
