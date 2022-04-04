import { useContext } from 'react';

import  {
  ProductCardContainer,
  Footer,
  Name,
  Price
} from './product-card.styles';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';
import { CartContext } from '../../context/card.context';

const ProductCard = ({product}) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } =useContext(CartContext);

  const addProductToCart = () => addItemToCart(product);

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`}/>
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
        <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to card</Button>
      </Footer>
    </ProductCardContainer>
)}

export default ProductCard;  