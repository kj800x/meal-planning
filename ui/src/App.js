import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { IndexPage } from "./pages/index-page/IndexPage";
import { RecipePage } from "./pages/recipe-page/RecipePage";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path={`/`}>
            <IndexPage />
          </Route>
          <Route
            path="/recipe/:id"
            render={(props) => <RecipePage {...props} />}
          />
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </DndProvider>
  );
}

export default App;
