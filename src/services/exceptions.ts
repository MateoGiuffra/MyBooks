class MyBookException extends Error {
    message: string
    status: number

    constructor(message: string, status: number) {
        super(message);
        this.message = message;
        this.status = status
    }
}

class BadRequestException extends MyBookException {
    constructor(message: string) {
        super(message, 400)
    }
}
class NotFoundException extends MyBookException {
    constructor(message: string) {
        super(message, 404)
    }
}




export { BadRequestException, NotFoundException }