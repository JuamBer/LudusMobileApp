export enum PageType {
  POPULAR_GAMES,
  QUICK_GAMES,
  CARD_GAMES,
  FILTERED_GAMES
}

export interface Page<T> {
  items: T[],
  primerDoc: any;
  ultimoDoc: any;
  limit: number;
  type: PageType
}
