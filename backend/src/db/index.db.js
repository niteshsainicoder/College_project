import mongoose from "mongoose";

const ConnectDb = async()=>{
    
        const connectionInstance = await mongoose
          .connect(
            `${process.env.MONGO_URL}`
          )
          .then(() => {
            console.log(`databse connected  `);
          })
          .catch((error) => {
            console.log(`error is : ${error}`);
          });
         
}

export {ConnectDb};