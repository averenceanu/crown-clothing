export const selectCategoriesMap = (state) =>
  state.categories.categories.reduce((acc, category) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

//in this file we are transforming the data that is passed down afterwards.
//the business login is found in the selector file.
