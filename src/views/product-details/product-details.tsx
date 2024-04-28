import './product-details.scss'
import { useParams } from 'react-router-dom';

import Section from '../../components/section/section'
import { useEffect, useState } from 'react';

interface productInterface {
  name: string,
  description: string,
  price: string,
  image: string,
  categories: Array<string>,

}

function ProductDetails() {
  const { productName } = useParams<{productName: string}>();
  const cleanProductName = productName?.replace(/-/g, ' ');
  const [product, setProduct] = useState<productInterface>();

  const getProduct = () => {
    fetch('../../../public/products.json')
    .then(response => response.json())
    .then((data: Array<productInterface>) => {
      setProduct(data.find(dataProduct => cleanProductName?.toLowerCase() === dataProduct.name.toLowerCase()));
    })
    .catch();
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
                  <button className="product__buy-button">Buy</button>
              </div>
            </div>
          }
        </Section>
      </main>
  )
}

export default ProductDetails
