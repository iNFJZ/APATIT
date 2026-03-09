import { toast as toastify } from "react-toastify";

export const toast = {
  success: (message: string, description?: string) => {
    toastify.success(description ? `${message} ${description}` : message);
  },
  error: (message: string, description?: string) => {
    toastify.error(description ? `${message} ${description}` : message);
  },
  info: (message: string) => {
    toastify.info(message);
  },
  warn: (message: string) => {
    toastify.warn(message);
  },
};
