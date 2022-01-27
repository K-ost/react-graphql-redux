import React, { useState } from 'react'
import '../Alert/alert.scss'

const Alert = props => {
  const [show, setShow] = useState(props.show)

  const close = () => {
    setShow(false)
    console.log(show)
  }
  return (
    <>
    {show && <div className={`alert ${props.className ? props.className : ''}`}>
      {props.text}
      <button onClick={close}>&times;</button>
    </div>}
    </>
  )
}

export default Alert