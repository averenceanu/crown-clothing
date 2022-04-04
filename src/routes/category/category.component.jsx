import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CategoriesContext } from '../../context/categories.context';
import ProductCard from '../../components/product-card/product-card.component';
import { CategoryContainer, CategoryTitle } from './category.styles.jsx';


const Category = () => {

  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap])

  return (
    <>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {/* putting a safe-guard for when we try to render but the data hasn't been fetched yet */}
        { products && 
          products.map((product) => <ProductCard key={product.id} product={product}/>)
        }
      </CategoryContainer>
    </>
  )
}

export default Category;
