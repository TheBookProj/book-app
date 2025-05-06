export function getMiddlewareService() {
    if(window.location.hostname === "localhost") {
        return "http://127.0.0.1:8002"
    }
    return "PROD URL"
};