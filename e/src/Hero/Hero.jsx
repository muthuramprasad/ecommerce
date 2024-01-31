import React from 'react'

import Hero2 from './Hero2'
import Item from '../Item/Item'
import Item2 from '../Item/Item2'
import Item3 from '../Item/Item3'

import WomanBanner from './WomanBanner'
import KidsBanner from './KidsBanner'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div>
   
      <Hero2/> <br />
      <Link to='/mens' style={{ listStyleType: 'none', textDecoration: 'none' }}><Item/></Link>   <br />
      <WomanBanner/><br />
      <Link to='/womans' style={{ listStyleType: 'none', textDecoration: 'none' }}><Item2/></Link>   <br />
<KidsBanner/><br/>
<Link to='/kids' style={{ listStyleType: 'none', textDecoration: 'none' }}><Item3/></Link>   <br />
     
    </div>
  )
}

export default Hero
