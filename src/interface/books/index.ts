export interface IBooks {
  id?: string;
  name: string;
  year: number;
  author: string;
  summary: string;
  publisher: string;
  pageCount: number;
  readPage: number;
  finished: boolean;
  reading: boolean;
  insertedAt: string;
  updatedAt: string;
}

export interface IBookPayload
  extends Omit<IBooks, 'id' | 'insertedAt' | 'updatedAt'> {}

export interface IBookParams<T> {
  params: T;
}

export interface IBookQueryParams<T> {
  params: T;
}
