import { CATEGORIES_ACTION_TYPES, Category } from "./category.types";
import {
  createAction,
  ActionWithPayload,
  withMatcher,
} from "../../utils/reducer/reducer.utils";

export type SetCategories = ActionWithPayload<
  CATEGORIES_ACTION_TYPES.SET_CATEGORIES,
  Category[]
>;

export type CategoryAction = SetCategories;

export const setCategories = withMatcher(
  (categoriesArray: Category[]): SetCategories =>
    createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray)
);

// export const fetchCategoriesFailed = (error) =>
//   createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEG ORIES_FAILED, error);
