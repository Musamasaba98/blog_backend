class customError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? "failed" : "error"
        this.isOperational = true
        // capturing the stack trace keeps the reference to your error class
        Error.captureStackTrace(this, this.constructor)
    }
}

export default customError;