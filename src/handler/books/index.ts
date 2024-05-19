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

export { getAllBooksHandler };
