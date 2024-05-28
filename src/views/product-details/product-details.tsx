import './product-details.scss'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaHeart } from "react-icons/fa";

import Section from '../../components/section/section'
import QuantityAdjuster from '../../components/quantity-adjuster/quantity-adjuster';
import { cartNotificationState } from '../../states/cart-notification-state';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { requestAddProductQuantitytoCart, requestAddProductToCart, requestAddProductToWishlist, requestProduct, requestProductInCart, requestProductInWishlist, requestRemoveProductFromWishlist} from '../../utils/functions';
import { userTokenState } from '../../states/user-token';

interface productInterface {
  id: number,
  name: string,
  path: string,
  description: string,
  price: string,
  image: string,
  category: string,
}

function ProductDetails() {
  const { productPath } = useParams<{productPath: string}>();
  const [userToken, setUserToken] = useRecoilState<string | undefined>(userTokenState);
  const [product, setProduct] = useState<productInterface>();
  const [resetQuantity, setResetQuantity] = useState<boolean>(false);
  const setCartNotifications = useSetRecoilState<number>(cartNotificationState);
  const [productInWishlist, setProductInWishlist] = useState<boolean>(false);
  let quantity = 1;
  const navigate = useNavigate();

  const getProduct = () => {
    requestProduct(productPath!)
    .then((data) => {
      if(data){
        const pageProduct: productInterface = {
          id: data.id,
          name: data.name,
          path: data.path,
          description: data.description,
          price: data.price,
          image: data.image,
          category: data.category
        }
        setProduct(pageProduct);
        productIsInWishlist(pageProduct);
      }
    })
    .catch();
  }

  const productIsInWishlist = (pageProduct: productInterface | undefined) => {
    if(userToken && pageProduct){
      requestProductInWishlist(userToken, pageProduct.id)
      .then(result => {
          setProductInWishlist(result);
      })
      .catch();
    }
    else{
      setProductInWishlist(false);
    }
  }

  const addToWishlist = () => {
    if(userToken && product){
      requestAddProductToWishlist(userToken, product.id)
      .then(response => {
        setProductInWishlist(response);
      })
      .catch();
    }
  }

  const removeFromWishlist = () => {
    if(userToken && product){
      requestRemoveProductFromWishlist(userToken, product.id)
      .then(response => {
        setProductInWishlist(!response);
      })
      .catch();
    }
  }

  const handleWishlist = () => {
    if(userToken && product){
      if(!productInWishlist){
        addToWishlist();
      }
      else{
        removeFromWishlist();
      }
    }
    else{
      window.alert('You need to be logged in to add products to your wishlist.');
    }
  }

  const addToCart = () => {
    if(product && userToken){
      requestProductInCart(userToken, product.id)
      .then(productInCart => {
        if(productInCart){
          requestAddProductQuantitytoCart(userToken, product.id, quantity)
          .then(response => {
            if(response){
              window.alert(`Added ${quantity} ${product.name} to cart.`);
            }
          })
          .catch()
        }
        else{
          requestAddProductToCart(userToken, product.id, quantity)
          .then(response => {
            if(response){
              window.alert(`Added ${quantity} ${product.name} to cart.`);
            }
          })
          .catch()
        }
      })
      .catch();
      setResetQuantity(!resetQuantity);
    }
    else{
      window.alert('You need to be logged in to add products to your cart.');
    }
  }

  const handleQuantity = (productId: number, newQuantity: number) => {
    quantity = newQuantity;
  }

  useEffect(() =>{
    getProduct();
  },[]);

  return (
      <main className="main">
        <Section title='CampGear' classes='section--woods-bg section--h-hundred'>
          { product &&
            <div className="product">
              <div className="product__container">
                <div className='product__image-wishlist-container'>
                  <img className="product__image" src={product.image} alt={product.name+" image"}></img>
                  <FaHeart className={`product__wishlist-button ${productInWishlist? 'product__wishlist-button--red' : 'product__wishlist-button--gray'}`} onClick={() => handleWishlist()}/>
                </div>
              </div>
              <div className="product__container product__details-container">
                  <h2 className="product__name">{product.name}</h2>
                  <p className="product__price">{'$'+product.price}</p>
                  <p className="product__description">{product.description}</p>
                  <div className='product__buy-container'>
                    <QuantityAdjuster productId={product.id} handleQuantity={handleQuantity} resetQuantity={resetQuantity}/>
                    <button className="product__buy-button" onClick={addToCart}>Add to Cart</button>
                  </div>
              </div>
            </div>
          }
        </Section>
      </main>
  )
}

export default ProductDetails
