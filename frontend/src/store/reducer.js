import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    orders: [],
    auth: null
  },
  reducers: {
    setItemCart: (state, action) => {
      state.orders.push(action.payload)
      localStorage.setItem('orders', JSON.stringify(state.orders))
    },
    deleteItemCart: (state, action) => {
      state.orders = state.orders.filter(item => item.id !== action.payload)
      localStorage.setItem('orders', JSON.stringify(state.orders))
    },
    changeItemCart: (state, action) => {
      let currentOrder = state.orders.find(item => item.id === action.payload.id)
      currentOrder.count = action.payload.value
      localStorage.setItem('orders', JSON.stringify(state.orders))
    },
    loadItemsCart: (state,action) => {
      state.orders = action.payload
    },
    loginReducer: (state, action) => {
      console.log(state, action)
      state.auth = action.payload
    }
  }
})

export const { setItemCart, deleteItemCart, changeItemCart, loadItemsCart, loginReducer } = cartSlice.actions
export default cartSlice.reducer