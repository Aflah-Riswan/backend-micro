import 'dotenv/config' 
import { app } from "./app.js";

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log("api gateway is running on ",PORT)
})