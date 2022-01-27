import React, { useEffect, useState } from 'react'
import Input from '../components/Input/Input'
import { useHttp } from '../hooks/http.hook'
import { useDispatch, useSelector } from 'react-redux'
import { loginReducer } from '../store/reducer'

const Auth = () => {
  const [authForm, setAuthForm] = useState({ email: '', password: '' })
  const [regForm, setRegForm] = useState({ email: '', username: '', password: '' })
  const [loginStatus, setLoginStatus] = useState('')
  const [regData, setRegData] = useState(null)

  const { request } = useHttp()

  const dis = useDispatch()
  const auth = useSelector(state => state.cart.auth)

  
  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem('user'))
    if ( userdata && userdata.token ) {
      dis(loginReducer(userdata))
    }
  },[dis])



  // Handlers
  const authHandler = e => {
    e.preventDefault()
    setAuthForm({ ...authForm, [e.target.name]: e.target.value })
  }
  const regHandler = e => {
    e.preventDefault()
    setRegForm({ ...regForm, [e.target.name]: e.target.value })
  }

  // registerFunc
  const registerFunc = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...regForm } )
      setRegData(data)
      document.querySelector('#username').value = ''
      document.querySelector('#email').value = ''
      document.querySelector('#password').value = ''
    } catch(e) {}
  }


  // authFunc
  const authFunc = async () => {
    const data = await request('/api/auth/login', 'POST', { ...authForm } )
    if ( data.message === 'Пользователь авторизован' ) {
      localStorage.setItem('user', JSON.stringify(data))
      dis(loginReducer(data))
    }
    setLoginStatus(data.message)
  }

  // logoutFunc
  const logoutFunc = () => {
    dis(loginReducer(null))
    localStorage.removeItem('user')
  }


  return (
    <div className="row">
      
      <div className="grid6 sm12">
        {!auth ?
        <>
          <div className="authbox">
            <h2>Авторизация</h2>
            <Input type="email" name="email" placeholder="Введите e-mail" onChange={authHandler} />
            <Input type="password" name="password" placeholder="Введите пароль" onChange={authHandler} />
            <button className="btn" onClick={authFunc}>Войти</button>
          </div>
          {loginStatus && <p className={ (loginStatus === 'Пользователь авторизован') ? 'color-success' : 'color-danger'}>{loginStatus}</p>}
        </> :
          <div className="authbox">
            <h2>{auth.name}</h2>
            <p>{auth.email}</p>
            <button className='btn' onClick={logoutFunc}>Выйти</button>
          </div>
        }
      </div>


      {!auth && <div className="grid6 sm12">
        <div className="authbox">
          <h2>Регистрация</h2>
          <Input type="text" name="username" placeholder="Ваше имя" onChange={regHandler} id="username" />
          <Input type="email" name="email" placeholder="Введите e-mail" onChange={regHandler} id="email" />
          <Input type="password" name="password" placeholder="Введите пароль" onChange={regHandler} id="password" />
          <button className="btn" onClick={registerFunc}>Регистрация</button>
        </div>
        {regData && 
          <p className={ (regData.message === 'Пользователь был успешно зарегистрирован') ? 'color-success' : 'color-danger'}>{regData.message}</p>
        }
        { (regData && regData.hasOwnProperty('errors')) ?
          <ul className="list color-danger">
            { regData.errors.map((el, index) => <li key={index}>{el.msg}</li>) }
          </ul> : ''
        }
      </div>}
      
    </div>
  )
}

export default Auth