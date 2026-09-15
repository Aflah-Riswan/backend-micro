import app from './server'
import { connectDB } from './src/infrastructure/database/connection'
const PORT = process.env.DATABASE_URL

async function startServer () {
    try {
       await connectDB()
       console.log("server caolled database succesfully...")
       app.listen(PORT,()=>{
        console.log("server is connected to ",PORT)
       })
    } catch (error) {
        console.log(" found error im connecting server : ",error)
    }
}