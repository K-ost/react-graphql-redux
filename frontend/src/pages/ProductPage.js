import React, { createRef, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import { useParams } from "react-router-dom"
import AddCart from '../components/AddCart'
import Reviews from '../components/Reviews/Reviews'
import Gallery from '../components/Gallery/Gallery'
import StaticRate from '../components/StaticRate'


const ProductPage = () => {
  const [more,setMore] = useState(false)
  
  const params = useParams()
  let { id } = params

  const GET_PRODUCT = gql`
    query GetProduct {
      getProduct(id: "${id}") {
        id, title, price, art, instock, instock_customer,
        action, cat, subcat, imgs, hit, new, brand, country,
        doc, video, text
      }
    }
  `
  const { data, loading, error } = useQuery(GET_PRODUCT)
  if ( loading ) return <p>Loading...</p>
  if ( error ) return <p>Server error - 500</p>
  const product = data.getProduct


  // showMoreText
  const moreTxt = createRef()
  const refText = createRef()
  const showMoreText = e => {
    e.preventDefault()
    let height = refText.current.offsetHeight
    if (!more) {
      setMore(true)
      moreTxt.current.style.maxHeight = height + 'px'
    } else {
      setMore(false)
      moreTxt.current.removeAttribute('style')
    }
  }
  

  return (
    <>
      <h1>{product.title}</h1>
      <div className="row product_page">
        <div className="grid4">
          <Gallery images={product.imgs} />
        </div>
        <div className="grid8">
          <p>Артикул: {product.art}</p>
          <p>Производитель: {product.brand}</p>
          <h4>{product.price} <small>руб.</small></h4>
          <AddCart details={product} />
          <StaticRate id={product.id} cls="big" />
          {product.text &&
            <>
            <div
              className={`product_page_text ${(product.text.length > 400) && 'short'} ${more ? 'active' : ''}`}
              ref={moreTxt}
            >
              <div className="product_page_text_inner" ref={refText} dangerouslySetInnerHTML={{ __html: product.text }}></div>
            </div>
            {(product.text.length > 400) && <p><a href="/" onClick={showMoreText}>{!more ? 'Показать' : 'Скрыть'} полный текст</a></p>}
            </>
          }
          <Reviews id={product.id} />
        </div>
      </div>
    </>
  )
}

export default ProductPage