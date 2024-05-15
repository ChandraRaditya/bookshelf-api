const { getAllBooks } = require('../../handler/books');

const bookRoutes = [
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
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

module.exports = bookRoutes;
