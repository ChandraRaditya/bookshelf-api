import {
  ReqRefDefaults,
  Request,
  ResponseToolkit,
  ResponseObject,
} from '@hapi/hapi';
import books from '../../data';

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
    message: 'Buku Tidak Ditemukan',
  });
  response.code(400);
  return response;
};

export { getAllBooksHandler, getBookByIdHandler };
