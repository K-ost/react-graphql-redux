import React, { useState } from 'react'
import SwiperCore, { Pagination, Navigation, Thumbs } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.min.css'
import './gallery.scss'

SwiperCore.use([Pagination, Navigation, Thumbs])

const Gallery = ({ images }) => {
  const [thumbs, setThumbs] = useState(null)

  return (
    <div className="gallery">
      <div className="gallery_big">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          thumbs={{ swiper: thumbs }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="gallery_thumbs">
        <Swiper
          spaceBetween={4}
          slidesPerView={3}
          onSwiper={setThumbs}
          watchSlidesVisibility
          watchSlidesProgress
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default Gallery