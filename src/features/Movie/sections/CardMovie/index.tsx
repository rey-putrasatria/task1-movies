import React from 'react'
import MovieType from '@/types/MovieType'
import { PATH_IMAGE } from '@/utils/endpoint'
import { Card, Rate, Tag } from 'antd'

const CardMovie = ({ data }: { data: MovieType }) => {
  const { original_title, poster_path, release_date, vote_average } = data
  const image = poster_path
    ? PATH_IMAGE + poster_path
    : 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'

  return (
    <Card
      className="w-auto lg:h-[400px] md:h-[500px] sm:h-[600px] h-72 bg-center bg-cover relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url('${image}')`,
      }}
    >
      <Tag color={'blue'}>{release_date}</Tag>
      <div className="absolute inset-0 p-4 flex flex-col justify-end">
        <h3 className="text-xl font-semibold text-white">
          {original_title.length > 20
            ? original_title.slice(0, 20) + '...'
            : original_title}
        </h3>
        {vote_average > 2 ? (
          <div className='flex gap-1 items-center'>
            <p className='text-yellow-400 mt-1'>{vote_average}</p>
            <Rate disabled defaultValue={(vote_average * 5) / 10} count={5} />
          </div>
        ) : null}
      </div>
    </Card>
  )
}

export default CardMovie
