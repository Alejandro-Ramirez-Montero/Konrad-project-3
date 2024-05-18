import './cart.scss'
import { useEffect, useState } from 'react';
import { cartNotificationState } from '../../states/cart-notification-state';
import { useSetRecoilState } from 'recoil';

import Section from '../../components/section/section'
import SimpleList from '../../components/simple-list/simple-list';
import { useNavigate } from 'react-router-dom';

interface productInterface {
  name: string,
  path: string,
  description: string,
  price: string,
  image: string,
  categories: Array<string>,
}

interface cartProductInterface {
  name: string,
  quantity: number,
  price: number,
  totalPrice: number,
  image: string,
}

function Cart() {
  const [cart, setCart] = useState<Array<cartProductInterface> | null>(localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')!) : null);
  const setCartNotifications = useSetRecoilState<number>(cartNotificationState);
  const navigate = useNavigate();

  const getProducts = () => {
    if(localStorage.getItem('cart')){
      setCart(JSON.parse(localStorage.getItem('cart')!));
      //va fetch
    }
  }

  const handleQuantity = (newQuantity:number, productName?:string) => {
    const cartProduct = cart?.find(p => p.name == productName);
    if(cartProduct){
      cartProduct!.quantity = newQuantity;
      const totalPrice = newQuantity * cartProduct!.price
      cartProduct!.totalPrice = parseFloat(totalPrice.toFixed(2));
      
      const cartCopy:Array<cartProductInterface> = [...cart!];
      const cartIndex = cartCopy.findIndex(p => p.name == productName);
      cartCopy[cartIndex] = cartProduct;
      setCart(cartCopy);
    }
  }

  const removeProduct = (productName: string) => {
    const cartCopy = cart?.filter(p => p.name !== productName);
    if(cartCopy){
      if(cartCopy.length === 0){
        setCart([]);
      }
      else{
        setCart(cartCopy);
      }
    }
  }

  const navigateToCheckout = () => {
    navigate('/checkout');
  }

  useEffect(() =>{
    getProducts();
  },[]);

  useEffect(() => {
    if(cart){
      if(cart.length == 0){
        localStorage.removeItem('cart');  
      }
      else{
        localStorage.setItem('cart', JSON.stringify(cart));
      }
      setCartNotifications(cart.length);
    }
    else{
      setCartNotifications(0);
    }
  },[cart]);

  return (
      <main className="main">
        <Section title='Cart:' classes='section--campfire-bg section--min-vh'>
          { cart && cart.length > 0? 
            <div className='cart'>
              <SimpleList list={cart} handleQuantity={handleQuantity} removeProduct={removeProduct}/>
              <div className='cart__checkout-container'>
                <p style={{fontWeight: "700"}}>Price Subtotal: </p>
                <p>$99999</p>
                <p style={{fontWeight: "300", fontSize: "15px"}}>*taxes and shipping not included yet</p>
                <button className='cart__cart-button' onClick={() => navigateToCheckout()}>Proceed to Checkout</button>
              </div>
            </div>
            :
            <div className='centered-message'>The cart is empty</div>
          }
        </Section>
      </main>
  )
}

export default Cart
