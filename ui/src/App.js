import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { HomePage } from "./pages/home/HomePage";
import { RecipePage } from "./pages/recipe/RecipePage";
import { ShoppingListPage } from "./pages/plan/shopping-list/ShoppingListPage";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/search/:id">
            <HomePage />
          </Route>
          <Route path="/meals/:id">
            <HomePage />
          </Route>
          <Route path="/settings/:id">
            <HomePage />
          </Route>
          <Route path="/shopping-list/:id">
            <ShoppingListPage />
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
