import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'
import path from 'path'
import { fileURLToPath } from 'url'
import type { IUserGrpcClient } from '../../interface/services/IUserGrpcClient.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const protoPath = path.join(
    __dirname,
    "proto",
    "user.proto"
)
const packageDefinition = protoLoader.loadSync(protoPath)
const userProto = grpc.loadPackageDefinition(packageDefinition) as unknown as {
     user: {
        UserService: grpc.ServiceClientConstructor;
    };
}

export class UserGrpcClient implements IUserGrpcClient {
    private client : any
   constructor(){
    this.client = new userProto.user.UserService(
        "localhost:5001",
        grpc.credentials.createInsecure()
    )
   }

    getCurrentUser(accessToken: string): Promise<{ userId: string; role: string }> {
       return new Promise((resolve , reject)=>{
          this.client.GetUser({accessToken},(error:any , response : any )=>{
            if(error){
                return reject(error)
            }
            resolve({
                userId : response.userId,
                role : response.role
            })
          })
       })
   }
}