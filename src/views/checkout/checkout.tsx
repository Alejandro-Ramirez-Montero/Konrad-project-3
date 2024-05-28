import './checkout.scss'
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import Section from '../../components/section/section'
import ShippingForm from '../../components/shipping-form/shipping-form';
import PaymentForm from '../../components/payment-form/payment-form';
import CheckoutReview from '../../components/checkout-review/checkout-review';
import { userTokenState } from '../../states/user-token';
import { requestCart, requestConvertCartToOrder, requestGetCartTotal } from '../../utils/functions';
import Modal from '../../components/modal/modal';
import { checkoutState } from '../../states/checkout-state';
import { useNavigate } from 'react-router-dom';


interface orderDetailsInterface {
  province: string,
  city: string,
  address1: string,
  address2: string | undefined,
  zipCode: string,
  cardNumber: string,
}

interface CheckoutInterface {
  province: string | undefined;
  city: string | undefined;
  address1: string | undefined;
  address2: string | undefined;
  zipCode: number | undefined;
  cardNumber: number | undefined;
  cardHolderName: string | undefined;
  expireDate: Date | undefined;
  cvv: number | undefined;
}

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
  const checkoutInfo = useRecoilValue<CheckoutInterface>(checkoutState);
  const [total, SetTotal] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [cart, setCart] = useState<Array<cartProductInterface> | null>(null);
  const [step, setStep] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [doneLoading, setDoneLoading] = useState<boolean>(false);
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

  const getCartTotal = () => {
    if(userToken && cart){
      requestGetCartTotal(userToken)
      .then(response => {
        SetTotal(response);
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

  const maskCreditCard = (cardNumber: number | undefined) => {
    if(cardNumber){
        const card = cardNumber.toString();
        if (card.length <= 4) {
          return card;
        }
        
        const maskedSection = card.slice(0, -4).replace(/\d/g, '*');
        const visibleSection = card.slice(-4);
        
        return maskedSection + visibleSection;
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
    const orderDetails: orderDetailsInterface = {
      province: checkoutInfo.province!,
      city: checkoutInfo.city!,
      address1: checkoutInfo.address1!,
      address2: checkoutInfo.address2,
      zipCode: checkoutInfo.zipCode!.toString(),
      cardNumber: maskCreditCard(checkoutInfo.cardNumber)!,
    }
    if(userToken){
      requestConvertCartToOrder(userToken, orderDetails)
      .then(response => {
        if(response){
          setOpenModal(true);
        }
      })
      .catch();
    }
  }

  useEffect(() =>{
    getProducts();
  },[]);

  useEffect(() => {
    if(cart){
      calculateSubtotal();
      getCartTotal();
      if(cart.length == 0){
        navigate('/', { replace: true });
      }
      setDoneLoading(true);
    }
  },[cart]);

  return (
    <>
      { doneLoading && cart && cart.length > 0 &&
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
          <Modal openModal={openModal}>
            <div className='checkout__pay-message-container'>
              <div className='checkout__pay-message'>Thank you for your purchase!</div>
              <div className='checkout__pay-message checkout__pay-message--small'>Your order has been successfully placed.</div>
              <button className='checkout__button' onClick={() => {setOpenModal(false); navigate('/', { replace: true });}}>Continue Camping</button>
            </div>
          </Modal>
        </main>
      }
    </>
  )
}

export default Checkout
