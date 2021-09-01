import { Login } from "./pages/login/Login";
import { Home } from "./pages/home/Home";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthContext, AuthContextProvider } from "./contexts/Auth";
import { useContext } from "react";
import { LayoutContextProvider } from "./contexts/Layout";
import { Layout } from "./Components/layout/Layout";
import { LocationContextProvider } from "./contexts/Location";

function Authenticated() {
  return (
    <LayoutContextProvider>
      <LocationContextProvider>
        <Switch>
          <Route path="/app" exact component={Layout} />
          <Route path="/" exact component={Home} />
        </Switch>
      </LocationContextProvider>
    </LayoutContextProvider>
  );
}

function NotAuthenticated() {
  return (
    <Switch>
      <Route path="/sign-in" exact component={Login} />;
      <Route path="/" exact component={Home} />
    </Switch>
  );
}

function Routes() {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <Authenticated /> : <NotAuthenticated />;
}

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes />
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
