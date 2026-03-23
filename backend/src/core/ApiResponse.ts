import { Response } from 'express';
import { StatusCode } from './ApiError';

export interface ApiSuccessResponse<T = any> {
  statusCode: StatusCode;
  message: string;
  data: T;
}

export class ApiResponse {
  static success<T>(res: Response, statusCode: StatusCode, message: string, data: T): Response {
    return res.status(parseInt(statusCode.slice(0, 3)) || 200).json({
      statusCode,
      message,
      data
    } as ApiSuccessResponse<T>);
  }

  static created<T>(res: Response, message: string, data: T): Response {
    return this.success(res, StatusCode.CREATED, message, data);
  }

  static ok<T>(res: Response, message: string, data: T): Response {
    return this.success(res, StatusCode.SUCCESS, message, data);
  }
}
