//in this file we are transforming the data that is passed down afterwards.
//the business login is found in the selector file.

import { createSelector } from "reselect";
//memonisation: cash the previous value, so that the value did not update you show it

const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
  //if a change occured in the selectCategoryReducer > then perform the arrow function
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

//don't re-run unless the selectCategories has not change. Return back the prev. value
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);
