export function authHeader() {
  const token = JSON.parse(localStorage.getItem('token'));

  if (token) {
    return { Authorization: 'token ' + token };
  }
  return {};
}
