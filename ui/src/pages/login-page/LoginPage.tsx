import { useState } from "react";
import styled from "styled-components";
import { useLogin } from "./useLogin";

const LoginWrapper = styled.div`
  display: flex;
  background: #eaf2e0;
  padding: 20px;
`;

const LoginContainer = styled.div`
  width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  & > * {
    margin: 8px;
  }

  label {
    display: flex;

    input {
      margin-left: 8px;
      flex: 1;
    }
  }

  button {
    align-self: flex-end;
  }
`;

export const LoginPage = () => {
  const { login } = useLogin();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <LoginWrapper>
      <LoginContainer>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button onClick={() => login(username, password)}>Log in</button>
      </LoginContainer>
    </LoginWrapper>
  );
};
