import type { TokenPayload } from "../src/interface/services/ITokenService.js";

declare global {
    namespace Express {
        interface Request {
            user?: TokenPayload;
            accessToken?: string;
        }
    }
}

export {};