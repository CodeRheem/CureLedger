export enum StatusCode {
  SUCCESS = '10000',
  CREATED = '10001',
  VALIDATION_ERROR = '40001',
  UNAUTHORIZED = '40100',
  FORBIDDEN = '40300',
  NOT_FOUND = '40400',
  CONFLICT = '40900',
  UNPROCESSABLE_ENTITY = '42200',
  SERVER_ERROR = '50000',
  SERVICE_UNAVAILABLE = '50300'
}

export interface ApiErrorResponse {
  statusCode: StatusCode;
  message: string;
  data?: any;
}

export class ApiError extends Error {
  statusCode: StatusCode;
  data?: any;

  constructor(statusCode: StatusCode, message: string, data?: any) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }

  static unauthorized(message: string = 'Unauthorized'): ApiError {
    return new ApiError(StatusCode.UNAUTHORIZED, message);
  }

  static forbidden(message: string = 'Access forbidden'): ApiError {
    return new ApiError(StatusCode.FORBIDDEN, message);
  }

  static notFound(message: string = 'Resource not found'): ApiError {
    return new ApiError(StatusCode.NOT_FOUND, message);
  }

  static validation(message: string, data?: any): ApiError {
    return new ApiError(StatusCode.VALIDATION_ERROR, message, data);
  }

  static conflict(message: string): ApiError {
    return new ApiError(StatusCode.CONFLICT, message);
  }

  static internal(message: string = 'Internal server error'): ApiError {
    return new ApiError(StatusCode.SERVER_ERROR, message);
  }

  getHttpStatus(): number {
    switch (this.statusCode) {
      case StatusCode.UNAUTHORIZED:
        return 401;
      case StatusCode.FORBIDDEN:
        return 403;
      case StatusCode.NOT_FOUND:
        return 404;
      case StatusCode.CONFLICT:
        return 409;
      case StatusCode.VALIDATION_ERROR:
      case StatusCode.UNPROCESSABLE_ENTITY:
        return 422;
      case StatusCode.SERVICE_UNAVAILABLE:
        return 503;
      case StatusCode.SERVER_ERROR:
      default:
        return 500;
    }
  }

  toResponse(): ApiErrorResponse {
    return {
      statusCode: this.statusCode,
      message: this.message,
      data: this.data
    };
  }
}
