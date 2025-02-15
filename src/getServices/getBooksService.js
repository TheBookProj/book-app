export function getBooksService() {
    if(window.location.hostname === "localhost") {
        return "http://127.0.0.1:8000"
    }
    return "PROD URL"
};