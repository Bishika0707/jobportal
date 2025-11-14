import mongoose from "mongoose";
const connecttDB= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongodb coonected successfully');
    }
    catch(error)
    {
        console.log(error);
    }
}
export default connecttDB;