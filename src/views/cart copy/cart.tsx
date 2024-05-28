/*
import './cart.scss'
import { useEffect, useState } from 'react';
import { cartNotificationState } from '../../states/cart-notification-state';
import { useRecoilState, useSetRecoilState } from 'recoil';

import Section from '../../components/section/section'
import SimpleList from '../../components/simple-list/simple-list';
import { useNavigate } from 'react-router-dom';
import { userTokenState } from '../../states/user-token';
import { requestCart, requestRemoveProductFromCart, requestUpdateProductQuantityInCart } from '../../utils/functions';

interface cartProductInterface {
  id: number,
  name: string,
  quantity: number,
  price: number,
  totalPrice: number,
  image: string,
}

function Cart() {
  const [cart, setCart] = useState<Array<cartProductInterface> | null>(null);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [userToken, setUserToken] = useRecoilState<string | undefined>(userTokenState);
  const setCartNotifications = useSetRecoilState<boolean>(cartNotificationState);
  const navigate = useNavigate();

  const getProducts = () => {
    if(userToken){
      requestCart(userToken)
      .then(cartList => {
        const cartProducts: Array<cartProductInterface> = cartList.map((cartProduct: any) => ({
          id: cartProduct.product.id,
          name: cartProduct.product.name,
          quantity: cartProduct.quantity,
          price: cartProduct.product.price,
          totalPrice: cartProduct.price,
          image: cartProduct.product.image,
        }));
        setCart(cartProducts);
      })
      .catch();
    }
  }

  const handleQuantity = (productId: number, newQuantity: number) => {
    if(userToken && cart){
      requestUpdateProductQuantityInCart(userToken, productId, newQuantity)
      .then(result => {
        if(result){
          getProducts();
        }
      })
      .catch()
    }
  }

  const removeProduct = (productId: number) => {
    if(userToken && cart){
      requestRemoveProductFromCart(userToken, productId)
      .then(result => {
        if(result){
          getProducts();
        }
      })
      .catch();
    }
  }

  const calculateSubtotal = () => {
    let productsSubtotal: number = 0;
    if(cart){
      cart.forEach(product => {
        productsSubtotal += parseFloat((product.price * product.quantity).toFixed(2));
      });
      setSubtotal(parseFloat(productsSubtotal.toFixed(2)));
    }
  }

  const navigateToCheckout = () => {
    navigate('/checkout');
  }

  useEffect(() =>{
    getProducts();
  },[]);

  useEffect(() => {
    if(cart && cart.length > 0){
      calculateSubtotal();
      setCartNotifications(true);
    }
    else{
      setCartNotifications(false);
    }
  },[cart]);

  return (
      <main className="main">
        <Section title='Cart:' classes='section--campfire-bg section--min-vh'>
          { cart && cart.length > 0? 
            <div className='cart'>
              <SimpleList list={cart} handleQuantity={handleQuantity} removeProduct={removeProduct}/>
              <div className='cart__checkout-container'>
                <p className='cart__checkout-title'>Price Subtotal: </p>
                <div className='cart__checkout-content'>
                  <p style={{fontSize: "25px"}}>${subtotal}</p>
                  <p style={{fontWeight: "300", fontSize: "15px", color:"lightgray"}}>*taxes and shipping not included yet</p>
                  <button className='cart__cart-button' onClick={() => navigateToCheckout()}>Proceed to Checkout</button>
                </div>
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
*/