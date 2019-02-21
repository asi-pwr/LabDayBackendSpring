export function authHeader() {
    const token = localStorage.getItem('token')

    if (token) {
        return { 'Authorization': 'token ' + token };
    } else {
        return {};
    }
}