import React, { useEffect, useState } from 'react'
import '../components/Reviews/reviews.scss'

const News = () => {

  const [posts, setPosts] = useState([])
  const numPages = 5
  const [current, setCurrent] = useState(numPages)
  
  useEffect(() => {
    const loadposts = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=30')
      const data = await response.json()
      setPosts(data)
    }
    loadposts()
  },[])

  const loadnewsFunc = () => {
    setTimeout(() => {
      setCurrent(state => current + numPages)
    }, 500)
  }


  return (
    <div>
      <h1>News</h1>
      <ul>
        {posts.map(item => (
          <li className='review' key={item.id}><h4>{item.title}</h4> {item.body}</li>
        )).slice(0,current)}
      </ul>
      {(current < posts.length) && <button className='btn' onClick={loadnewsFunc}>Load more...</button>}
    </div>
  )
}

export default News