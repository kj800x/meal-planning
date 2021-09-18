import { useCallback, useEffect, useState } from "react";
import { useAppState } from "../../library/hooks/useAppState";

export const useLogin = () => {
  const [token, setToken] = useAppState<string | null>("auth", null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error>();

  const updateStatus = useCallback(() => {
    setLoading(true);
    fetch("/life-logger/auth/status")
      .then((response) => response.json())
      .then((body) => {
        console.log(body);
        setToken(body.token);
        setLoading(false);
      });
  }, [setToken]);

  const login = useCallback(
    (username: string, password: string) => {
      setLoading(true);
      fetch("/life-logger/auth/login", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ username, password }),
      })
        .then(updateStatus)
        .catch(setError);
    },
    [updateStatus]
  );

  const logout = useCallback(() => {
    setLoading(true);
    fetch("/life-logger/auth/logout", { method: "POST" })
      .then(updateStatus)
      .catch(setError);
  }, [updateStatus]);

  useEffect(updateStatus, [updateStatus]);

  console.log(token);

  return {
    token: token,
    isLoggedIn: !!token,
    login,
    logout,
    loading,
    error,
  };
};
