import { createContext, useState, useEffect } from 'react';

//custom function that will allow to find the product in the array and increment the quantity
const addCartItem = (cartItems, productToAdd) => {
  //find if cartItems contains productToAdd
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)
  //if found increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? 
    {...cartItem, quantity: cartItem.quantity + 1}
    : cartItem
    );
  }
  //return new array with modified cartItems/ new cart item
  return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems, cartItemToRemove) =>{
  //find the cart item to remove 
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id)

  //check it quantity is = to 1, if it is remove that item from the cart items
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);  
  }
  //return back cartitems with --
  return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id 
    ? {...cartItem, quantity: cartItem.quantity - 1}
    : cartItem
  )
}

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id); 

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [], 
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0
})

export const CartProvider = ({children}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setcartTotal] = useState(0);

  //counting the # of items in the cart
  useEffect(() => {
    const newCartCount = cartItems.reduce ((total, cartItem) => total + cartItem.quantity, 0)
    setCartCount(newCartCount)
  }, [cartItems])

  useEffect(() => {
    const newCartTotal = cartItems.reduce ((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
    setcartTotal(newCartTotal)
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove))
  }

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear))
  }

  const value = {
    isCartOpen, 
    setIsCartOpen, 
    addItemToCart, 
    cartItems, 
    cartCount, 
    removeItemFromCart, 
    clearItemFromCart,
    cartTotal,
  };

  return <CartContext.Provider value={value}> {children} </CartContext.Provider>
}