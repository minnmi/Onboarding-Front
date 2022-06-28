export interface IPage<T> {
  content: T[];
  pageable: string;
  totalElements: number;
  last: boolean;
  totalPages: number;
  size: number;
  number: number;
  sort: ISort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface ISort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}



