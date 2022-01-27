import React, { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useDispatch } from "react-redux"
import { loadItemsCart } from "./store/reducer"
import Header from "./components/Header"
import Home from "./pages/Home"
import CatPage from "./pages/CatPage"
import ProductPage from "./pages/ProductPage"
import Basket from "./pages/Basket"
import Auth from "./pages/Auth"
import News from "./pages/News"

const routes = [
  { path: "/", Component: Home },
  { path: "/catalog", Component: CatPage },
  { path: "/:id", Component: ProductPage },
  { path: "/basket", Component: Basket },
  { path: "/auth", Component: Auth },
  { path: "/news", Component: News }
]

function App() {
  
  const dispatch = useDispatch()
  useEffect(() => {
    if ( localStorage.getItem('orders') !== null ) {
      dispatch(loadItemsCart( JSON.parse(localStorage.getItem('orders')) ))
    }
  },[dispatch])

  return (
    <>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            {routes.map(({path, Component}) => {
              return <Route key={path} exact path={path} element={<Component />} />
            })}
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
