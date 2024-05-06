import './home.scss'
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Hero from '../../components/hero/hero'
import Section from '../../components/section/section'
import SimpleCard from '../../components/simple-card/simple-card'


function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const featuredCategoriesRef = useRef<HTMLDivElement>(null);

  const navigateTo = (category: string) => {
    navigate('/products-list/?id=products-section&category=' + category);
  }

  useEffect(() =>{
    const params = new URLSearchParams(location.search);
    const id = params.get("id");

    if (id === "featured-section" && featuredCategoriesRef.current) {
      featuredCategoriesRef.current.scrollIntoView({ behavior: "smooth"});
    }
  },[location]);

  return (
      <main className="main">
        <Hero/>
        <div ref={featuredCategoriesRef} style={{position: 'absolute', marginTop: '-350px'}} />
        <Section title='Featured Categories:' classes='section--brown section--vh'>
          <div className='featured-categories-container'>
            <SimpleCard classes='feature-1' title={'Camping Tents'} buttonAction={() => navigateTo('Camping-Tents')}/>
            <SimpleCard classes='feature-2' title={'Bags and Beds'} buttonAction={() => navigateTo('Bags-and-Beds')}/>
            <SimpleCard classes='feature-3' title={'Camping Kitchen'} buttonAction={() => navigateTo('Camping Kitchen')}/>
            <SimpleCard classes='feature-4' title={'Chairs and Tables'} buttonAction={() => navigateTo('Chairs-and-Tables')}/>
          </div>
        </Section>
      </main>
  )
}

export default Home
