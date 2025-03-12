// API Response

class ApiResponse{
    constructor(
        statusCode,
        data,
        message = "Success"
    ){
        this.data = data;
        this.message = message;
        this.statusCode = statusCode;
    }
}

export { ApiResponse };