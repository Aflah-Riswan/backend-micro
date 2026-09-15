import { TokenPayload } from "../interface/services/TokenService"

 declare global {
    namespace Express {
        interface Request {
            user?: TokenPayload
        }
    }
 }
 export  {}