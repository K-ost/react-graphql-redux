import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setItemCart, deleteItemCart } from '../store/reducer'

const AddCart = props => {
  const [countState, setCountState] = useState(1)
  const dispatch = useDispatch()
  const orders = useSelector(state => state.cart.orders)
  const isCart = orders.some(item => item.id === props.details.id)

  let orderItem = props.details

  // addToCartFunc
  const addToCartFunc = e => {
    e.stopPropagation()
    setCountState(state => state + 1)
    if ( !isCart ) {
      orderItem = { ...orderItem, count: countState }
      dispatch(setItemCart(orderItem))
    } else {
      let currentOrder = orders.find(item => item.id === props.details.id)
      orderItem = { ...orderItem, count: currentOrder.count + 1 }
      dispatch(deleteItemCart(props.details.id))
      dispatch(setItemCart(orderItem))
    }
  }

  return (
    <button className="btn" onClick={addToCartFunc}>В корзину</button>
  )
}

export default AddCart