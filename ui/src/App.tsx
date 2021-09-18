import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { ErrorDisplay } from "./library/ErrorDisplay";

import { Header } from "./library/Header";
import { Loading } from "./library/Loading";
import { HomePage } from "./pages/home-page/HomePage";
import { LoginPage } from "./pages/login-page/LoginPage";
import { useLogin } from "./pages/login-page/useLogin";

const Wrapper = styled.div`
  padding: 40px;

  margin: 0 auto;
  display: block;
  max-width: 1000px;
`;

const AppRouter = () => {
  const { isLoggedIn, loading, error } = useLogin();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return (
    <Switch>
      <Route exact path={`/`} component={HomePage} />
    </Switch>
  );
};

export function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Wrapper>
        <Header />
        <AppRouter />
      </Wrapper>
    </Router>
  );
}
