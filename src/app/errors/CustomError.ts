
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class CustomError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: any
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  public sendResponse(res: Response) {
    const statusCode = this.statusCode; // Explicitly reference statusCode
    return res.status(statusCode).json({
      success: false,
      name: this.name,
      message: this.message,
      ...(this.details && { details: this.details }),
      ...(process.env.NODE_ENV === 'development' && { stack: this.stack }),
    });
  }
}
