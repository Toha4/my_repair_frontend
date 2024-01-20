import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { API_URL } from "../config";
import { setAccessCookie } from "./cookies";

// Create axios instance.
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Function that will be called to refresh authorization
const refreshAuthLogic = (failedRequest: any) =>
  axios
    .get(`/api/auth/refresh`, { headers: failedRequest.response.headers })
    .then((resp) => {
      // Set up new access token
      const { access } = resp.data;
      setAccessCookie(access);

      // Set up access token of the failed request.
      failedRequest.response.config.headers.Authorization = `Bearer ${access}`;

      // Retry the request with new setup!
      return Promise.resolve();
    });

// Create axios interceptor
createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic);

export default axiosInstance;
