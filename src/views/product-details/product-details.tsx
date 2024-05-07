import './product-details.scss'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Section from '../../components/section/section'
import QuantityAdjuster from '../../components/quantity-adjuster/quantity-adjuster';
import { cartNotificationState } from '../../states/cart-notification-state';
import { useSetRecoilState } from 'recoil';

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

function ProductDetails() {
  const { productPath } = useParams<{productPath: string}>();
  const [product, setProduct] = useState<productInterface>();
  const [resetQuantity, setResetQuantity] = useState<boolean>(false);
  const setCartNotifications = useSetRecoilState<number>(cartNotificationState);
  let quantity = 1;
  const navigate = useNavigate();

  const getProduct = () => {
    fetch('../../../public/products.json')
    .then(response => response.json())
    .then((data: Array<productInterface>) => {
      setProduct(data.find(dataProduct => productPath?.toLowerCase() === dataProduct.path.toLowerCase()));
    })
    .catch();
  }

  const addToCart = () => {
    if(product){
      let cart:Array<cartProductInterface> = localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')!) : null;
      if(cart == null){
        localStorage.setItem('cart', JSON.stringify([]));
        cart = [];
      }
      let cartProduct = cart.find(p => p.name === product.name);
      if(cartProduct){
        cartProduct.quantity += quantity;
        const totalPrice = cartProduct.quantity * cartProduct.price;
        cartProduct.totalPrice = parseFloat(totalPrice.toFixed(2));
      }
      else {
        const totalPrice = Number(product.price) * quantity;
        cartProduct = {
          name: product.name,
          quantity: quantity,
          image: product.image,
          price: Number(product.price),
          totalPrice: parseFloat(totalPrice.toFixed(2)),
        }
        cart.push(cartProduct);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      setCartNotifications(cart.length);
      setResetQuantity(!resetQuantity);
      window.alert(`Added ${quantity} ${product.name} to cart.`);
    }
  }

  const handleQuantity = (newQuantity: number) => {
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
                  <img className="product__image" src={product.image} alt={product.name+" image"}/>
              </div>
              <div className="product__container product__details-container">
                  <h2 className="product__name">{product.name}</h2>
                  <p className="product__price">{'$'+product.price}</p>
                  <p className="product__description">{product.description}</p>
                  <div className='product__buy-container'>
                    <QuantityAdjuster handleQuantity={handleQuantity} resetQuantity={resetQuantity}/>
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
