import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar'>
      <Link to='/'>SignUp</Link>
      <Link to='/users'>Users</Link>
    </div>
  )
}

export default Navbar