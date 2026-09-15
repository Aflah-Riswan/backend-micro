
import mongoose from 'mongoose'

export const connect = async () =>{
    try {
        await mongoose.connect(process.env.DATABASE_URL as string)
        console.log("databse connected succesfully")
    } catch (error) {
        console.log("error found in connecting database : ",error)
    }
}