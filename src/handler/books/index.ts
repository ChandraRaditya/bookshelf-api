import {
  ReqRefDefaults,
  Request,
  ResponseToolkit,
  ResponseObject,
} from '@hapi/hapi';
import { nanoid } from 'nanoid';
import books from '../../data';
import {
  IBookParams,
  IBookPayload,
  IBookQueryParams,
} from '../../interface/books';

const getAllBooksHandler = (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
): ResponseObject => {
  const { name, reading, finished } = request.query as IBookQueryParams<{
    name?: string;
    reading?: 0 | 1;
    finished?: 0 | 1;
  }>['params'];

  let filteredBooks = books;

  if (name) {
    filteredBooks = filteredBooks.filter(
      (book) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        book.name && book.name.toLowerCase().includes(name.toLowerCase()),
      // eslint-disable-next-line function-paren-newline
    );
  }

  if (typeof reading !== 'undefined') {
    filteredBooks = filteredBooks.filter(
      (book) => book.reading && book.reading === Boolean(reading),
    );
  }

  if (typeof finished !== 'undefined') {
    filteredBooks = filteredBooks.filter(
      (book) => book.finished && book.finished === Boolean(finished),
    );
  }

  const response = h.response({
    status: 'success',
    data: {
      books: filteredBooks.map((book) => ({
        id: book.id || '',
        name: book.name || '',
        publisher: book.publisher || '',
      })),
    },
  });
  response.code(200);
  return response;
};

const getBookByIdHandler = (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
): ResponseObject => {
  const { id } = request.params as IBookParams<{ id: string }>['params'];
  const filteredBooksById = books.filter((data) => data.id === id)[0];

  if (filteredBooksById !== undefined) {
    const response = h.response({
      status: 'success',
      data: filteredBooksById,
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(400);
  return response;
};

const addBookHandler = (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
): ResponseObject => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload as IBookPayload;

  const id = nanoid(16);
  const insertedAt = new Date().toDateString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });

    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });

    response.code(400);
    return response;
  }

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal menambahkan buku. Mohon isi nama buku',
  });

  response.code(500);
  return response;
};

const editBookHandler = (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
): ResponseObject => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload as IBookPayload;

  const { bookId } = request.params as IBookParams<{
    bookId: string;
  }>['params'];
  const insertedAt = new Date().toDateString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  const findIndex = books.findIndex((book) => book.id === bookId);

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });

    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });

    response.code(400);
    return response;
  }

  if (findIndex !== -1) {
    books[findIndex] = {
      ...books[findIndex],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      insertedAt,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukam',
  });

  response.code(404);
  return response;
};

const deleteBookHandler = (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
): ResponseObject => {
  const { bookId } = request.params as IBookParams<{
    bookId: string;
  }>['params'];

  const findIndex = books.findIndex((book) => book.id === bookId);

  if (findIndex !== -1) {
    books.splice(findIndex, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(200);
  return response;
};

export {
  getAllBooksHandler,
  getBookByIdHandler,
  addBookHandler,
  editBookHandler,
  deleteBookHandler,
};
