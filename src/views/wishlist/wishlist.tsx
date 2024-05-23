import './wishlist.scss'
import { useEffect, useState } from 'react';
import { cartNotificationState } from '../../states/cart-notification-state';
import { useSetRecoilState } from 'recoil';

import Section from '../../components/section/section'
import SimpleList from '../../components/simple-list/simple-list';
import { useNavigate } from 'react-router-dom';

interface wishlistProductInterface {
  name: string,
  quantity: number,
  price: number,
  totalPrice: number,
  image: string,
}

function Wishlist() {
  const [wishlist, setWishlist] = useState<Array<wishlistProductInterface> | null>(localStorage.getItem('wishlist')? JSON.parse(localStorage.getItem('wishlist')!) : null);
  const navigate = useNavigate();

  const getProducts = () => {
    if(localStorage.getItem('cart')){
      setWishlist(JSON.parse(localStorage.getItem('wishlist')!));
      //va fetch
    }
  }

  const handleQuantity = (newQuantity:number, productName?:string) => {
    const wishlistProduct = wishlist?.find(p => p.name == productName);
    if(wishlistProduct){
      wishlistProduct!.quantity = newQuantity;
      const totalPrice = newQuantity * wishlistProduct!.price
      wishlistProduct!.totalPrice = parseFloat(totalPrice.toFixed(2));
      
      const wishlistCopy:Array<wishlistProductInterface> = [...wishlist!];
      const wishlistIndex = wishlistCopy.findIndex(p => p.name == productName);
      wishlistCopy[wishlistIndex] = wishlistProduct;
      setWishlist(wishlistCopy);
    }
  }

  const removeProduct = (productName: string) => {
    const wishlistCopy = wishlist?.filter(p => p.name !== productName);
    if(wishlistCopy){
      if(wishlistCopy.length === 0){
        setWishlist([]);
      }
      else{
        setWishlist(wishlistCopy);
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
    if(wishlist){
      if(wishlist.length == 0){
        localStorage.removeItem('wishlist');  
      }
      else{
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
      }
    }
  },[wishlist]);

  return (
      <main className="main">
        <Section title='Wishlist:' classes='section--campfire-bg section--min-vh'>
          { wishlist && wishlist.length > 0? 
            <div className='wishlist'>
              <SimpleList list={wishlist} handleQuantity={handleQuantity} removeProduct={removeProduct}/>
              <div className='wishlist__checkout-container'>
                <p style={{fontWeight: "700"}}>Wishlist Subtotal: </p>
                <p>$99999</p>
                <p style={{fontWeight: "300", fontSize: "15px"}}>*The following items will be added to your current cart</p>
                <button className='wishlist__cart-button' onClick={() => navigateToCheckout()}>Add Wishlist to Cart</button>
              </div>
            </div>
            :
            <div className='centered-message'>The wishlist is empty</div>
          }
        </Section>
      </main>
  )
}

export default Wishlist
