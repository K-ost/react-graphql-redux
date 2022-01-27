import React, { useState } from 'react'
import '../Input/input.scss'

const Input = props => {
  const [focus, setFocus] = useState(false)

  const setBlurFunc = e => {
    let { value } = e.target
    if ( value ) {
      setFocus(true)
    } else {
      setFocus(false)
    }
  }

  return (
    <div className="input-field">
      <div className={`input-float ${focus && 'focus'}`}>
        <label>{props.placeholder}</label>
        <input
          type={props.type}
          name={props.name}
          className={`input ${props.className ? props.className : ''}`}
          onChange={props.onChange}
          onFocus={() => setFocus(true)}
          onBlur={setBlurFunc}
          id={props.id}
        />
      </div>
    </div>
  )
}

export default Input