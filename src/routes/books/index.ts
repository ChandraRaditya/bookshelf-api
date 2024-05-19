import { ServerRoute, ReqRefDefaults } from '@hapi/hapi';
import { getAllBooksHandler } from '../../handler/books';

const bookRoutes: ServerRoute<ReqRefDefaults>[] = [
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: () => {},
  },
  {
    method: 'POST',
    path: '/books',
    handler: () => {},
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