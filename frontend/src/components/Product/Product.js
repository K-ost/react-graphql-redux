import React from 'react'
import { Link } from 'react-router-dom'
import AddCart from '../AddCart'
import StaticRate from '../StaticRate'
import './product.scss'

const Product = ({ item }) => {
  
  // Price regular space thousand
  const price = item.price.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')


  return (
    <div className="grid3">
      <div className="product">
        <div className="product_entry">
          <div className="product_img">
            <Link to={`/${item.id}`}><img src={item.imgs[0]} alt="" /></Link>
          </div>
          <h2><Link to={`/${item.id}`}>{item.title}</Link></h2>
        </div>
        <StaticRate id={item.id} />
        <div className="product_price">{price} <small>руб.</small></div>
        <AddCart details={item} />
      </div>      
    </div>
  )
}

export default Product