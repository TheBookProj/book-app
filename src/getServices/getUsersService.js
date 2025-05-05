export function getUsersService() {
    if(window.location.hostname === "localhost") {
        return "http://127.0.0.1:8001"
    }
    return "PROD URL"
};