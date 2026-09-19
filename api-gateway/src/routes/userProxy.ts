import { createProxyMiddleware } from "http-proxy-middleware";

export const userAuthProxy = createProxyMiddleware({
    target: "http://localhost:4000",
    changeOrigin: true,

    pathRewrite: {
        "^/": "/auth/"
    }
});

export const userProxy = createProxyMiddleware({
    target: "http://localhost:4000",
    changeOrigin: true,

    pathRewrite: {
        "^/": "/users/"
    }
});