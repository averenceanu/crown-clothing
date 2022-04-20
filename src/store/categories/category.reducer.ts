import { CATEGORIES_ACTION_TYPES, Category } from "./category.types";
import { CategoryAction } from "./category.action";

export type CategoriesState = {
  readonly categories: Category[];
};

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {} as CategoryAction //discriminating union
) => {
  //const { type, payload } = action;

  switch (action.type) {
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
      return { ...state, categories: action.payload };
    default:
      return state;
  }
};
