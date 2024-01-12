class ApiResponse {
    constructor(statusCode, loggedin=false,data  = "Something wrong", message = "sucsess") {
      this.statusCode = statusCode;
      this.loggedin=loggedin
      this.data = data;
      this.message = message;
      this.success = statusCode < 400;
    }
  }
  
  export {ApiResponse}