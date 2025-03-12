// API Error

class ApiError extends Error {
    custructor(
        statusCode,
        message= "Something went wrong",
        errors = [],
        stack = ""
    ){
        Super(message);
        this.statusCode = statusCode;
        this.message = message
        this.errors = errors;
        this.data = null;
        this.success = false;

        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };