import grpc from "@grpc/grpc-js";
import protoLaoder from "@grpc/proto-loader";
import path from "node:path";
import { fileURLToPath } from "url";
import { TokenService } from "../services/TokenService.js";
import { GetUserById } from "../../application/use-case/GetUserById.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const protoPath = path.join(__dirname, "proto", "user.proto");

const packageDefinition = protoLaoder.loadSync(protoPath,{
      keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const userProto = grpc.loadPackageDefinition(packageDefinition) as unknown as {
    user: {
        UserService: grpc.ServiceClientConstructor;
    };
};

export class UserGrpcServer {
  private server: grpc.Server;
  constructor(
    private tokenService: TokenService,
    private getUserById: GetUserById,
  ) {
    this.server = new grpc.Server();
    this.server.addService(userProto.user.UserService.service, {
      GetUser: this.getUser,
    });
  }
  getUser = async (call: any, callback: any) => {
    try {
      const accessToken = call.request.accessToken;
      if (!accessToken) {
        return callback({
          code: grpc.status.UNAUTHENTICATED,
          message: "Access token is required",
        });
      }
      const decoded = this.tokenService.verifyAccessToken(accessToken);
      const user = await this.getUserById.execute(decoded.userId);
      if (!user) {
        return callback({
          code: grpc.status.NOT_FOUND,
          message: "user is  not found",
        });
      }
      return callback(null,{
        userId: user.id,
        role: user.role,
      });
    } catch (error) {
      console.error("gRPC GetUserMe error:", error);
      return callback({
        code: grpc.status.UNAUTHENTICATED,
        message: "Invalid or expired token",
      });
    }
  };
  start(port:number){
   this.server.bindAsync(`0.0.0.0:${port}`,
    grpc.ServerCredentials.createInsecure(),
    (err,port)=>{
        if(err){
            console.log("failed to start grpc server")
            return
        }
        console.log("server is running on the port  : ",port)
        
    }
   )
  }
}
