import React, { useEffect, useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'

const StaticRate = ({ id, cls }) => {
  
  const [rates, setRates] = useState(0)

  const { data, loading } = useQuery(gql`
    query GET_COMMENTS {
      getReviews(productId: "${id}") {
        rate
      }
    }
  `)

  const TOTAL_RATE = gql`
    mutation setAllRate($input: setAllRateInput) {
      setAllRate(input: $input) {
        id, rate
      }
    }
  `
  const [newTotalRate] = useMutation(TOTAL_RATE)


  useEffect(() => {
    if (loading) return <p>Loading...</p>
    if ( data.getReviews.length ) {
      const currentRate = data.getReviews.reduce((prev, item) => {
        return prev + Number(item.rate)
      }, 0)
      setRates(currentRate / data.getReviews.length)
      newTotalRate({
        variables: {
          input: {
            id,
            rate: String(rates / data.getReviews.length)
          }
        }
      })
    }
  },[data, loading, id, newTotalRate, rates])


  return (
    <div className="static_rate_wrapper">
      <div className={`static_rate ${cls ? cls : ''} v${Math.floor(rates)}`}><b></b></div>
      <p>(Рейтинг: {rates})</p>
    </div>
  )
}

export default StaticRate