import './checkout.scss'
import { useEffect, useState } from 'react';
import { cartNotificationState } from '../../states/cart-notification-state';
import { useRecoilState, useSetRecoilState } from 'recoil';

import Section from '../../components/section/section'
import SimpleList from '../../components/simple-list/simple-list';
import ShippingForm from '../../components/shipping-form/shipping-form';
import PaymentForm from '../../components/payment-form/payment-form';
import CheckoutReview from '../../components/checkout-review/checkout-review';
import { userTokenState } from '../../states/user-token';
import { requestCart, requestGetCartTotal } from '../../utils/functions';
import Modal from '../../components/modal/modal';

interface cartProductInterface {
  id: number,
  name: string,
  quantity: number,
  price: number,
  totalPrice: number,
  image: string,
}

function Checkout() {
  const [userToken, setUserToken] = useRecoilState<string | undefined>(userTokenState);
  const [total, SetTotal] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [cart, setCart] = useState<Array<cartProductInterface> | null>(localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')!) : null);
  const [step, setStep] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);

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

  const getCartTotal = () => {
    if(userToken && cart){
      requestGetCartTotal(userToken)
      .then(response => {
        SetTotal(response);
      })
      .catch()
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

  const pay = () => {
    //llamar a endpoint y mostrar pop up de gracias por comprar.
    setOpenModal(true);

  }

  useEffect(() =>{
    getProducts();
    getCartTotal();
  },[]);

  useEffect(() => {
    if(cart){
      calculateSubtotal();
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
        <Section title='Review and Pay' classes={`section--camping-bg ${step != 3? 'section--minimize section__title--minimize' : ''}`}>
          <CheckoutReview previousStep={() => previousStep()} pay={() => pay()} active={step == 3} subtotal={subtotal} total={total}/>
        </Section>
        </div>
        <button onClick={() => previousStep()}>Previous step</button>
        <button onClick={() => nextStep()}>Next step</button>
        <Modal openModal={openModal}>
          <div className='checkout__pay-message-container'>
            <div>Enjoy your Camping!</div>
            <button className='checkout__button' onClick={() => setOpenModal(false)}>Continue Camping</button>
          </div>
        </Modal>
      </main>
  )
}

export default Checkout
