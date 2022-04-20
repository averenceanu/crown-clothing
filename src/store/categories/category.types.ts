export enum CATEGORIES_ACTION_TYPES {
  SET_CATEGORIES = "category/SET_CATEGORIES_MAP",
}

//enum allows to capture those strings as types themselves
export type CategoryItem = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};

export type Category = {
  title: string;
  imageUrl: string;
  items: CategoryItem[];
};

export type CategoryMap = {
  [key: string]: CategoryItem[];
};
