import { ServerRoute, ReqRefDefaults } from '@hapi/hapi';
import {
  addBookHandler,
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
    path: '/books/{id}',
    handler: () => {},
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: () => {},
  },
];

export default bookRoutes;
