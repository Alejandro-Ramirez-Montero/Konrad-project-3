import './wishlist.scss'
import { useEffect, useState } from 'react';
import { cartNotificationState } from '../../states/cart-notification-state';
import { useRecoilState, useSetRecoilState } from 'recoil';

import Section from '../../components/section/section'
import SimpleList from '../../components/simple-list/simple-list';
import { useNavigate } from 'react-router-dom';
import { userTokenState } from '../../states/user-token';
import { requestAddWishlistToCart, requestRemoveProductFromWishlist, requestUpdateProductQuantityInWishlist, requestWishlist } from '../../utils/functions';

interface wishlistProductInterface {
  id: number,
  name: string,
  quantity: number,
  price: number,
  totalPrice: number,
  image: string,
}

function Wishlist() {
  const [wishlist, setWishlist] = useState<Array<wishlistProductInterface> | null>(null);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [userToken, setUserToken] = useRecoilState<string | undefined>(userTokenState);
  const navigate = useNavigate();

  const getProducts = () => {
    if(userToken){
      requestWishlist(userToken)
      .then(list => {
        const wishlistProducts: Array<wishlistProductInterface> = list.map((wishlistProduct: any) => ({
          id: wishlistProduct.product.id,
          name: wishlistProduct.product.name,
          quantity: wishlistProduct.quantity,
          price: wishlistProduct.product.price,
          totalPrice: wishlistProduct.price,
          image: wishlistProduct.product.image,
        }));
        setWishlist(wishlistProducts);
      })
      .catch();
    }
  }

  const handleQuantity = (productId: number, newQuantity: number) => {
    if(userToken && wishlist){
      requestUpdateProductQuantityInWishlist(userToken, productId, newQuantity)
      .then(result => {
        if(result){
          getProducts();
        }
      })
      .catch()
    }
  }

  const removeProduct = (productId: number) => {
    if(userToken && wishlist){
      requestRemoveProductFromWishlist(userToken, productId)
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
    if(wishlist){
      wishlist.forEach(product => {
        productsSubtotal += parseFloat((product.price * product.quantity).toFixed(2));
      });
      setSubtotal(parseFloat(productsSubtotal.toFixed(2)));
    }
    
  }

  const addWishlistToCart = () => {
    //mandar solicitud de agregar productos al carrito y limpiar wishlist
    if(userToken){
      requestAddWishlistToCart(userToken)
      .then(response => {
        if(response){
          window.alert(`Added wishlist to cart.`);
        }
      })
      .catch()
    }
  }

  useEffect(() =>{
    getProducts();
  },[]);

  useEffect(() => {
    if(wishlist){
      calculateSubtotal();
    }
  },[wishlist]);

  return (
      <main className="main">
        <Section title='Wishlist:' classes='section--campfire-bg section--min-vh'>
          { wishlist && wishlist.length > 0? 
            <div className='wishlist'>
              <SimpleList list={wishlist} handleQuantity={handleQuantity} removeProduct={removeProduct}/>
              <div className='wishlist__cart-container'>
                <p className='wishlist__cart-title'>Wishlist Subtotal: </p>
                <div className='wishlist__cart-content'>
                  <p style={{fontSize: "25px"}}>${subtotal}</p>
                  <p style={{fontWeight: "300", fontSize: "15px", color:"lightgray"}}>*The following items will be added to your current cart</p>
                  <button className='wishlist__cart-button' onClick={() => addWishlistToCart()}>Add Wishlist to Cart</button>
                </div>
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
