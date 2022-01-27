import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItemCart, changeItemCart } from '../store/reducer'
import '../assets/basket.scss'


const Basket = () => {

  const dispatch = useDispatch()
  const orders = useSelector(state => state.cart.orders)

  const total = orders.reduce((prev, item) => {
    return prev + Number(item.price * item.count)
  }, 0)

  // changeCount
  const changeCount = (id, event) => {
    let { value } = event.target
    let currentOrder = orders.find(item => item.id === id)
    currentOrder = { ...currentOrder }
    currentOrder.count = Number(value)
    dispatch( changeItemCart({ value, id }) )
  }


  return (
    <div>
      <h1>Корзина</h1>
      <table className="basket_table">
        <thead>
          <tr>
            <th>№</th>
            <th colSpan="2">Наименование товара</th>
            <th>Цена</th>
            <th>Ко-во</th>
            <th colSpan="2">Стоимость</th>
          </tr>
        </thead>
        <tbody>
          {orders.length ? orders.map((item,index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td className="basket_table_img"><img src={item.imgs[0]} alt="" /></td>
              <td>
                <h3><Link to={`/${item.id}`}>{item.title}</Link></h3>
                <p>Артикул: <b>{item.art}</b></p>
              </td>
              <td><h4>{item.price} <small>руб.</small></h4></td>
              <td><input type="number" defaultValue={item.count} min="1" onChange={e => {changeCount(item.id, e)}} /></td>
              <td><h4>{item.price * item.count} <small>руб.</small></h4></td>
              <td><button onClick={e => {dispatch(deleteItemCart(item.id))}}>&times;</button></td>
            </tr>
          ))
            : <tr>
              <td colSpan="7">Ваша корзина пуста</td>
            </tr>
          }
        </tbody>
      </table>

      <h2>Итоговая стоимость: {total} руб.</h2>
    </div>
  )
}

export default Basket