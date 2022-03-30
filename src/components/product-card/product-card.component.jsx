import './product-card.styles.scss';
import Button from '../button/button.component';
const ProductCard = ({product}) => {
  const { name, price, imageURL } = product
  return (
    <div className='product-card-container'>
      <img src={imageURL} alt={`${name}`}/>
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
        <Button buttonType='inverted'>Add to card</Button>
      </div>
    </div>
)}

export default ProductCard; 