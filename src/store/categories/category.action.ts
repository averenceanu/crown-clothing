import { CATEGORIES_ACTION_TYPES, Category } from "./category.types";
import {
  createAction,
  ActionWithPayload,
} from "../../utils/reducer/reducer.utils";

export type SetCategories = ActionWithPayload<
  CATEGORIES_ACTION_TYPES.SET_CATEGORIES,
  Category[]
>;

export type CategoryAction = SetCategories;

export const setCategories = (categoriesArray: Category[]): SetCategories =>
  createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray);

// export const fetchCategoriesFailed = (error) =>
//   createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);
