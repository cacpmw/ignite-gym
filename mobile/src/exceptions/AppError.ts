export class AppError {
    public message: string;
    public statusCode: number;

    constructor(message = "Internal Server Error", statusCode = 500) {
        this.message = message;
        this.statusCode = statusCode;
    }
}