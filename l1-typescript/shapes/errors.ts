export abstract class BaseError extends Error {
    constructor(message) {
        super(message);

        this.name = this.constructor.name;
        this.message = message;

        if (typeof (<any> Error).captureStackTrace === 'function') {
            (<any> Error).captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
    }
}

export class InvalidArgumentError extends BaseError {}
