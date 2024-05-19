import { IBooks } from '../interface/books';
import dummyData from './dummyData.json';

const books: IBooks[] = [...(dummyData as IBooks[])];

export default books;
