import './home.scss'

import Hero from '../../components/hero/hero'
import Section from '../../components/section/section'
import SimpleCard from '../../components/simple-card/simple-card'


function Home() {
  return (
      <main className="main">
        <Hero/>
        <Section title='Featured Categories:' classes='section--brown section--vh'>
          <div className='featured-categories-container'>
            <SimpleCard classes='feature-1' title={'Camping Tents'}/>
            <SimpleCard classes='feature-2' title={'Bags and Beds'}/>
            <SimpleCard classes='feature-3' title={'Camping Kitchen'}/>
            <SimpleCard classes='feature-4' title={'Chairs and Tables'}/>
          </div>
        </Section>
      </main>
  )
}

export default Home
