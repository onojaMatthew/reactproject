
export const userAuthorized = (data) => {
  localStorage.setItem("token", JSON.stringify(data));
}

export const userAuthenticated = () => {
  return JSON.parse(localStorage.getItem("token"));
}

export const logout = () => {
  localStorage.removeItem("token");
}