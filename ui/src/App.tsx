import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import { Header } from "./library/Header";
import { RecipeDetailsPage } from "./pages/recipe-details-page/RecipeDetailsPage";
import { NewRecipePage } from "./pages/new-recipe-page/NewRecipePage";
import { RecipesPage } from "./pages/recipe-search-page/RecipesPage";

const NoPage = () => null;
const PlansPage = NoPage;
const PlanDetailsPage = NoPage;
const IngredientsPage = NoPage;
const IngredientDetailsPage = NoPage;

const Wrapper = styled.div``;

const ContentWrapper = styled.div`
  max-width: 1200px;
  background: lightblue;
  display: flex;
  margin: 0 auto;
  border: 4px solid green;
  border-top: none;
  box-sizing: border-box;
  flex-direction: column;
`;

const AppRouter = () => {
  return (
    <Switch>
      <Route exact path={`/`} component={RecipesPage} />
      <Route exact path={`/recipe/new`} component={NewRecipePage} />
      <Route exact path={`/recipe/:id`} component={RecipeDetailsPage} />
      <Route exact path={`/plans`} component={PlansPage} />
      <Route exact path={`/plan/:id`} component={PlanDetailsPage} />
      <Route exact path={`/ingredients`} component={IngredientsPage} />
      <Route exact path={`/ingredient/:id`} component={IngredientDetailsPage} />
    </Switch>
  );
};

export function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Wrapper>
        <Header />
        <ContentWrapper>
          <AppRouter />
        </ContentWrapper>
      </Wrapper>
    </Router>
  );
}
