// errorHandler response message...
class ErrorHandler extends Error {
    constructor(message: string, statusCode: number) {
        super(message);
        statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }
}

export { ErrorHandler as default };
