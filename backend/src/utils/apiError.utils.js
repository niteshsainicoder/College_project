class ApiError extends Error{
    constructor(stautscode , message = "Something went wrong" , err = [], stack = "" ){
        super(message);
        this.message=message,
        this.stautscode=stautscode,
        this.data = null,
        this.success = false,
        this.err = err

        if(stack){
            this.stack=stack
        }
        else{
            Error.captureStackTrace(this,this.constructor);
        }
    }
}
export {ApiError}