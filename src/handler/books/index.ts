import {
  ReqRefDefaults,
  Request,
  ResponseToolkit,
  ResponseObject,
} from '@hapi/hapi';
import { nanoid } from 'nanoid';
import books from '../../data';
import { IBookPayload } from '../../interface/books';

const getAllBooksHandler = (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
): ResponseObject => {
  const response = h.response({
    status: 'success',
    data: books,
  });
  response.code(200);
  return response;
};

const getBookByIdHandler = (
  request: Request<ReqRefDefaults>,
  h: ResponseToolkit<ReqRefDefaults>,
): ResponseObject => {
  const { id } = request.params;
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

export { getAllBooksHandler, getBookByIdHandler, addBookHandler };
