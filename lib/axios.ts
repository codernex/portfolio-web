import axios from "axios";
import { getSession, signOut } from "next-auth/react";
import { auth } from "./auth";

export const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

async function getAccessToken(server: boolean) {
  if (server) {
    // Server-side: use auth() with cookies
    const session = await auth();
    return session?.accessToken;
  } else {
    // Client-side
    const session = await getSession();
    return session?.accessToken;
  }
}

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });

  failedQueue = [];
};

// Request interceptor → attach token
apiInstance.interceptors.request.use(async (config) => {
  const server = typeof window === "undefined";
  const token = await getAccessToken(server);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor → handle 401
apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // If refresh already running → queue request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(apiInstance(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        // 🔥 This triggers jwt() callback → refreshAccessToken()
        const session = await getSession();
        console.log("TCL: session", session);

        if (!session?.accessToken) {
          throw new Error("Session expired");
        }

        processQueue(null, session.accessToken);

        originalRequest.headers.Authorization = `Bearer ${session.accessToken}`;

        return apiInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        await signOut();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
