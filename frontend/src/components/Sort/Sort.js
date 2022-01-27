import React from 'react'
import './Sort.scss'

const Sort = ({ setProducts, products }) => {

  // sortFunc
  const sortFunc = e => {
    const { value } = e.target
    switch (value) {
      case "priceUp":
        setProducts( products.slice().sort((a,b) => Number(b.price) < Number(a.price)) )
        break
      case "priceDown":
        setProducts( products.slice().sort((a,b) => Number(b.price) > Number(a.price)) )
        break
      case "rateUp":
        setProducts( products.slice().sort((a,b) => Number(a.rate) > Number(b.rate)))
        break
      case "rateDown":
        setProducts( products.slice().sort((a,b) => Number(b.rate) > Number(a.rate)))
        break
      default: return false
    }
  }

  return (
    <div className="sortable">
      <label>Сортировать</label>
      <div className="sortable_select">
        <select onChange={sortFunc}>
          <option>--- выбрать ---</option>
          <option value="priceUp">от дешевых к дорогим</option>
          <option value="priceDown">от дорогих к дешевым</option>
          <option value="rateUp">по возрастанию рейтинга</option>
          <option value="rateDown">по убыванию рейтинга</option>
        </select>
      </div>
    </div>
  )
}

export default Sort