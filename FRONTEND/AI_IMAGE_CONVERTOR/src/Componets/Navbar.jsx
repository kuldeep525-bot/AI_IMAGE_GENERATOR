import React from 'react'
import {Link} from 'react-router-dom'
import { assets } from '../assets/assets'

function Navbar() {
  return (
    <div>
      <Link to='/'>
      <img src={assets.logo} alt='' className='w-28 sm:w-32 lg:w-40'/>
      </Link>

      <div>
        <button>
          <img src={assets.credit_star} alt=''/>
          <p>Credits left : 99</p>
        </button>
        <p>Hi , AiCoding</p>
        <div>
          <img src={assets.profile_icon} alt='' className='w-10 drop-shadow' alt=""/>
        </div>
      </div>
    </div>
  )
}

export default Navbar