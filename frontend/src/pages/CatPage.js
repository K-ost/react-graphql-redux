import React, { useState, useEffect } from 'react'
import { useQuery } from "@apollo/client"
import Product from '../components/Product/Product'
import { GET_PRODUCTS } from '../graphql/query'
import Sort from '../components/Sort/Sort'

const CatPage = () => {
  const [products,setProducts] = useState([])
  const { data, loading, error } = useQuery(GET_PRODUCTS)

  useEffect(() => {
    if ( loading ) return <p>Products loading...</p>
    if ( error ) return <p>Server error</p>
    setProducts(data.getAllProducts)
  },[data, loading, error])


  return (
    <>
      <Sort setProducts={setProducts} products={products} />

      <div className="row all_products">
        {products
          ? products.map(item => <Product key={item.id} item={item} />)
          : <p>Товаров нет</p>
        }
      </div>
    </>
  )
}

export default CatPage