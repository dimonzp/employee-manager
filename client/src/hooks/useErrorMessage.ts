import { useCallback } from "react";
import { message } from "antd";

export const useErrorMessage = (error: string, noError: string = "") =>
  useCallback(() => {
    noError
      ? error && error !== noError && message.error(error)
      : error && message.error(error);
  }, [error, noError]);
