import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


function Header(props) {
  const total = useSelector(state => state.cart.orders)
  let totalCount = total.reduce((prev,item) => {
    return prev + Number(item.count)
  },0)
  
  const auth = useSelector(state => state.cart.auth)

  return (
    <div className="header">
      <div className="container">
        <h1>React App with GraphQL</h1>
        <div className="header_div">
          <ul className="nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/catalog">Catalog</Link></li>
            <li><Link to="/news">News</Link></li>
          </ul>
          <Link to="/basket" className="btn btn-cart">{totalCount && <span>{totalCount}</span>}</Link>
          <Link to="/auth" className={`btn btn-user ${auth && "logged"}`}></Link>
        </div>
      </div>
    </div>
  )
}

export default Header