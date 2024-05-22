import { ServerRoute, ReqRefDefaults } from '@hapi/hapi';
import {
  addBookHandler,
  deleteBookHandler,
  eidtBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
} from '../../handler/books';

const bookRoutes: ServerRoute<ReqRefDefaults>[] = [
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookByIdHandler,
  },
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: eidtBookHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookHandler,
  },
];

export default bookRoutes;
