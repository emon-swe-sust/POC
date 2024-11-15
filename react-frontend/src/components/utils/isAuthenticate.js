import { jwtDecode } from "jwt-decode";

export const isAuthenticate = () => {
  const token = sessionStorage.getItem("token");

  try {
    const { exp } = jwtDecode(token);

    if (Date.now() >= exp * 1000) {
      sessionStorage.removeItem("token");
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};
