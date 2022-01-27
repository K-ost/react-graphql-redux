import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { gql, useMutation } from '@apollo/client'
import Rating from '../components/Rating/Rating'
import Input from '../components/Input/Input'

const Form = ({ productId, refetch }) => {

  const auth = useSelector(state => state.cart.auth)
  
  const [authorRev, setAuthorRev] = useState('')
  const [textRev, setTextRev] = useState('')
  const [vote, setVote] = useState(0)

  const SET_REVIEW = gql`
    mutation SetReview($input: ReviewInput) {
      setReview(input: $input) {
        productId, author, text, rate
      }
    }
  `
  const [newReview] = useMutation(SET_REVIEW)

  // addReview
  const addReview = e => {
    e.preventDefault()
    if ( authorRev.length >=3 && textRev.length >= 3 ) {
      newReview({
        variables: {
          input: {
            productId,
            author: authorRev,
            text: textRev,
            rate: vote.toString()
          }
        }
      })
      setAuthorRev('')
      setTextRev('')
      refetch()
    } else {
      alert('Поля не должны быть пустыми')
    }
  }

  // voteFunc
  const voteFunc = e => {
    setVote(e.target.value)
  }


  return (
    <div className="reviewForm">
      {auth ?
        <form onSubmit={addReview}>
          <h3>Добавить отзыв</h3>
          <Rating vote={voteFunc} />
          <Input
            type="text"
            className="input"
            placeholder="Ваше имя"
            onChange={e => setAuthorRev(e.target.value)} value={authorRev}
          />
          <div className="input-field">
            <textarea
              className="input"
              onChange={e => setTextRev(e.target.value)}
              value={textRev}
              placeholder="Текст отзыва"
            ></textarea>
          </div>
          <div className="input-field">
            <button type="submit" className="btn">Добавить отзыв</button>
          </div>
        </form> :
        <b>Для того чтобы оставить комментарий, нужно <Link to="/auth">авторизоваться</Link>.</b>
      }
    </div>
  )
}

export default Form