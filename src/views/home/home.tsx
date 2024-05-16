import './home.scss'
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Hero from '../../components/hero/hero'
import Section from '../../components/section/section'
import SimpleCard from '../../components/simple-card/simple-card'
import List from '../../components/List/list';

interface productInterface {
  name: string,
  path: string,
  description: string,
  price: string,
  image: string,
  categories: Array<string>,
}

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const featuredCategoriesRef = useRef<HTMLDivElement>(null);
  const [featuredProducts, setFeaturedProducts] = useState<Array<productInterface>>([]);

  const navigateTo = (category: string) => {
    navigate('/products-list/?id=products-section&category=' + category);
  }

  const showProduct = (productPath:string) => {
    navigate('/product-details/'+ productPath);
  }

  const getFeaturedProducts = () => {
    let products:Array<productInterface> = [];
    fetch('../../../public/products.json')
    .then(response => response.json())
    .then((data: Array<productInterface>) => {
      for(let i = 0; i < 10; ++i){
        products.push(data[i]);
      }
      if(products.length > 0){
        setFeaturedProducts(products);
      }
    })
    .catch();
  }

  useEffect(() =>{
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    console.log(location);

    if (id === "featured-section" && featuredCategoriesRef.current) {
      featuredCategoriesRef.current.scrollIntoView({ behavior: "smooth"});
    }
  },[location]);

  useEffect(() => {
    getFeaturedProducts();
  },[]);

  return (
      <main className="main">
        <Hero/>
        <div className='featured-categories-ref' ref={featuredCategoriesRef}/>
        <Section title='Featured Categories:' classes='section--brown section--vh'>
          <div className='featured-categories-container'>
            <SimpleCard classes='feature-1' title={'Camping Tents'} buttonAction={() => navigateTo('Camping-Tents')}/>
            <SimpleCard classes='feature-2' title={'Bags and Beds'} buttonAction={() => navigateTo('Bags-and-Beds')}/>
            <SimpleCard classes='feature-3' title={'Camping Kitchen'} buttonAction={() => navigateTo('Camping Kitchen')}/>
            <SimpleCard classes='feature-4' title={'Chairs and Tables'} buttonAction={() => navigateTo('Chairs-and-Tables')}/>
          </div>
        </Section>
        <Section title='Featured Products:' classes='section--woods-bg'>
          <div className='featured-products'>
            {featuredProducts && 
              <List list={featuredProducts} showProduct={showProduct} classes='product-list--flex'/>
            }
          </div>
        </Section>
      </main>
  )
}

export default Home
