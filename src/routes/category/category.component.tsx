import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductCard from "../../components/product-card/product-card.component";
import { CategoryContainer, CategoryTitle } from "./category.styles";
import { selectCategoriesMap } from "../../store/categories/category.selector";

type CategoryRouteParams = {
  category: string;
};

const Category = () => {
  //with useParams you have to reinforce that you will render only when it is defined
  const { category } = useParams<
    keyof CategoryRouteParams
  >() as CategoryRouteParams;
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {/* putting a safe-guard for when we try to render but the data hasn't been fetched yet */}
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
    </>
  );
};

export default Category;
