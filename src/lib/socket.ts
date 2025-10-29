import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket() {
  if (!socket) {
    const apiUrl = (import.meta as any).env?.VITE_BACKEND_API_URL as string | undefined;
    const socketEnv = (import.meta as any).env?.VITE_BACKEND_SOCKET_URL as string | undefined;
    const derivedFromApi = apiUrl ? apiUrl.replace(/\/?api\/?$/, "") : undefined;
    const url = socketEnv || derivedFromApi || "http://localhost:5050";
    socket = io(url, {
      transports: ["websocket"],
    });
  }
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}


