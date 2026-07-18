export class HttpError extends Error {
  public readonly statusCode: number;
  public readonly errors?: unknown;

  constructor(
    statusCode: number,
    message: string,
    errors?: unknown
  ) {
    super(message);

    this.statusCode = statusCode;
    this.errors = errors;

    Object.setPrototypeOf(this, HttpError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export default HttpError;