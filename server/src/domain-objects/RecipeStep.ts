import { RecipeDataObject } from "../data-objects/Recipe";
import { LOADER, RecipeStepDataObject } from "../data-objects/RecipeStep";
import { get } from "../util/get";
import { makeDomainObjectLoader } from "../util/makeDomainObjectLoader";
import { DomainObject } from "./types";

interface RecipeStepGQLType {
  id: number;
  ordering: number;
  image?: string;
  instructions: string;
  recipe: RecipeDataObject;
}

export const RecipeStep: DomainObject<RecipeStepGQLType, RecipeStepDataObject> =
  {
    resolver: {
      id: get("id"),
      ordering: get("ordering"),
      image: get("image"),
      instructions: get("instructions"),

      recipe: ({ recipeId }, _, context) => {
        return context.loaders.Recipe.load(recipeId);
      },
    },
    loader: makeDomainObjectLoader(LOADER),
  };
