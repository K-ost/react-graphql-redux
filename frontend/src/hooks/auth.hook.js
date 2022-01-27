import { useState, useEffect, useCallback } from "react"

export const useAuth = () => {
  const [loginData, setLoginData] = useState(null)

  const login = useCallback(data => {
    setLoginData(data)
    localStorage.setItem('userdata', JSON.stringify(data))
  },[])

  const logout = useCallback(() => {
    setLoginData(null)
    localStorage.removeItem('userdata')
  },[])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userdata'))
    if ( data && data.token ) {
      login(data)
    }
  },[login])

  return { loginData, login, logout }
}
