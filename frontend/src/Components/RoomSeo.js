import React from 'react'
import { Helmet } from 'react-helmet'

const RoomSeo = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

RoomSeo.defaultProps = {
  title: 'Welcome To Booking Room App',
  description: 'We sell the best Room for cheap',
  keywords: 'Bed, buy Room, cheap Bed , Per Day and Week and Month',
}

export default RoomSeo
