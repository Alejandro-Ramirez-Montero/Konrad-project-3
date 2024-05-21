import './checkout.scss'
import { useEffect, useState } from 'react';
import { cartNotificationState } from '../../states/cart-notification-state';
import { useSetRecoilState } from 'recoil';

import Section from '../../components/section/section'
import SimpleList from '../../components/simple-list/simple-list';
import ShippingForm from '../../components/shipping-form/shipping-form';
import PaymentForm from '../../components/payment-form/payment-form';

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

function Checkout() {
  const [cart, setCart] = useState<Array<cartProductInterface> | null>(localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')!) : null);
  const setCartNotifications = useSetRecoilState<number>(cartNotificationState);
  const [step, setStep] = useState<number>(1);

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

  const previousStep = () => {
    if(step > 1){
      setStep(step - 1);
    }
  }

  const nextStep = () => {
    if(step < 3){
      setStep(step + 1);
    }
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
        <div className='checkout'>
        <Section title='Shipping information' classes={`section--woods-bg ${step != 1? 'section--minimize section__title--minimize' : ''}`}>
          <ShippingForm nextStep={() => nextStep()} active={step == 1}/>
        </Section>
        <Section title='Payment Information' classes={`section--dark-blue ${step != 2? 'section--minimize section__title--minimize' : ''}`}>
          <PaymentForm previousStep={() => previousStep()} nextStep={() => nextStep()} active={step == 2}/>
        </Section>
        <Section title='Review and Pay' classes={`section--camping-bg ${step != 3? 'section--minimize section__title--minimize' : ''}`}><div>approval</div></Section>
        </div>
        <button onClick={() => previousStep()}>Previous step</button>
        <button onClick={() => nextStep()}>Next step</button>
      </main>
  )
}

export default Checkout
