import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CategoriesContext } from '../../context/categories.context';
import ProductCard from '../../components/product-card/product-card.component';
import './category.styles.scss';


const Category = () => {

  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap])

  return (
    <div className='category-container'>
      {/* putting a safe-guard for when we try to render but the data hasn't been fetched yet */}
      { products && 
        products.map((product) => <ProductCard key={product.id} product={product}/>)
      }
    </div>
  )
}

export default Category;
