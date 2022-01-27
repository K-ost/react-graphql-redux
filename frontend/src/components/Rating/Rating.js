import React, { Fragment } from 'react'
import './rating.scss'

const Rating = ({ vote }) => {
  const rates = [
    { id: "star5", value: "5", className: "full", title: "Awesome" },
    { id: "star4", value: "4", className: "full", title: "Pretty good" },
    { id: "star3", value: "3", className: "full" , title: "Not bad" },
    { id: "star2", value: "2", className: "full" , title: "Kinda bad" },
    { id: "star1", value: "1", className: "full" , title: "Sucks" }
  ]

  return (
    <div className="rating">
      <div className="rating_stars">
        {rates.map(item => (
          <Fragment key={item.id}>
            <input type="radio" id={item.id} name="rating" value={item.value} onChange={vote} />
            <label className={item.className} htmlFor={item.id} title={item.title}></label>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default Rating