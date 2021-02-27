import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';

/**
 * @extends Error
 */
class ExtendableError extends Error {
  status: Number;
  isPublic: Boolean;
    isOperational: boolean;
  constructor(message: string, status: Number, isPublic: Boolean) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.isPublic = isPublic;
    this.isOperational = true; 

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class APIError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {Number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor(message: string, status: Number = StatusCodes.INTERNAL_SERVER_ERROR, isPublic = false) {
    super(message, status, isPublic);
  }
}

export default APIError;