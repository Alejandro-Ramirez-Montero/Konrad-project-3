import './cart.scss'
import { useEffect, useState } from 'react';
import { cartNotificationState } from '../../states/cart-notification-state';
import { useSetRecoilState } from 'recoil';

import Section from '../../components/section/section'
import SimpleList from '../../components/simple-list/simple-list';

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
  const [cart, setCart] = useState<Array<cartProductInterface> | null>(null);
  const setCartNotifications = useSetRecoilState<number>(cartNotificationState);

  const getProducts = () => {
    if(localStorage.getItem('cart')){
      setCart(JSON.parse(localStorage.getItem('cart')!));
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
        setCart(null);
      }
      else{
        setCart(cartCopy);
      }
    }
  }

  useEffect(() =>{
    getProducts();
  },[]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    if(cart){
      setCartNotifications(cart.length);
    }
    else{
      setCartNotifications(0);
    }
  },[cart]);

  return (
      <main className="main">
        <Section title='Cart:' classes='section--campfire-bg section--min-vh'>
          { cart? 
            <SimpleList list={cart} handleQuantity={handleQuantity} removeProduct={removeProduct}/>
            :
            <div className='centered-message'>The cart is empty</div>
          }
        </Section>
      </main>
  )
}

export default Cart
