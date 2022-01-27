import React from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { useSelector } from 'react-redux'
import Form from '../Form'
import '../Reviews/reviews.scss'

const Reviews = ({ id }) => {

  const auth = useSelector(state => state.cart.auth)

  const GET_REVIEWS = gql`
    query GetReviews {
      getReviews(productId: "${id}") {
        id
        author
        date
        text
        approved
        rate
      }
    }
  `

  const REMOVE_REVIEW = gql`
    mutation RemoveRview($input: String) {
      removeReview(input: $input) { id }
    }
  `
  const [delReview] = useMutation(REMOVE_REVIEW)

  const resReviews = useQuery(GET_REVIEWS)

  if (resReviews.loading) return <p>Loading...</p>
  if (resReviews.error) return <p>Error</p>

  const reviews = resReviews.data.getReviews
  const refetch = resReviews.refetch

  // Delete review
  const deleteRevFunction = id => {
    delReview({
      variables: { input: id }
    })
    refetch()
  }


  return (
    <>
      <h3>Отзывы о товаре: ({reviews.length})</h3>
      <ul className="reviews_list">
        {reviews.length
          ? reviews.map(comment => {
            return <li key={comment.id} className="review">
              <div className="review_top">
                <div className="review_top_left">
                  <h4>{comment.author}</h4>
                  <small>{comment.date}</small>
                </div>
                <div className={`static_rate v${comment.rate}`}><b></b></div>
              </div>
              <div>{comment.text}</div>
              {auth && <div className="review_settings">
                <button className="btn btn-red" onClick={() => deleteRevFunction(comment.id)}>Удалить</button>
              </div>}
            </li>
          }).sort((a, b) => a.date > b.date)
          
          : <p>Отзывов пока что нет</p>
        }
      </ul>
      <Form productId={id} refetch={refetch} />
    </>
  )
}

export default Reviews