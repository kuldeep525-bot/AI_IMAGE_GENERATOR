import React from 'react'
import Header from '../Componets/Header'
import Steps from '../Componets/Steps'
import Description from '../Componets/Description'
import Testimonial from '../Componets/Testimonial'
import Generate from '../Componets/Generate'
function Home() {
  return (
    <div>
      <Header/>
      <Steps/>
      <Description/>
      <Testimonial/>
      <Generate/>
    </div>
  )
}

export default Home