import 'dotenv/config'
import app from './server.js'
import { connectDB } from './infrastructure/database/connection.js'
const PORT = process.env.PORT

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
startServer()