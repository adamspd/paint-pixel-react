import React from 'react'
import { Link } from 'react-router-dom'

function PublicHomePage() {


  return (
    <>
    <div>PublicHomePage</div>
    <button> <Link to='/dashboard'>login</Link></button>
    <button> <Link to='/SignUp'>Register</Link></button>
    
    </>
  )
}

export default PublicHomePage