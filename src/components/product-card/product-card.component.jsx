import { useContext } from 'react';

import './product-card.styles.scss';
import Button from '../button/button.component';
import { CartContext } from '../../context/card.context';

const ProductCard = ({product}) => {
  const { name, price, imageURL } = product;
  const { addItemToCart } =useContext(CartContext);

  const addProductToCart = () => addItemToCart(product);

  return (
    <div className='product-card-container'>
      <img src={imageURL} alt={`${name}`}/>
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
        <Button buttonType='inverted' onClick={addProductToCart}>Add to card</Button>
      </div>
    </div>
)}

export default ProductCard; 