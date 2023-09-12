import { access_token } from '@/utils/endpoint'
import { Col, Row } from 'antd'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Home = () => {
  const router = useRouter()
  const { request_token } = router.query
  const [data, setData] = useState([]) 

  useEffect(() => {
    const getMovie = async () => {
      const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Mjg2N2UyNmYwZTg2ZjZkMzY1OTQ0ZjBkZWQzZDkyMCIsInN1YiI6IjY0ZmVlNDAwNmEyMjI3MDBmZDFmNzhjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sfuHgEpQ-5dV51_9suKqhapacKCLnoW79MOHs5DJHko',
        },
      }

      const res = await axios.request(options)
      setData(res.data.results)
      console.log(res.data)
    }
    getMovie()
  }, [])
  return (
    <div>
      <Row gutter={[16, 16]} className="lg:px-12 md:px-6 sm:px-6 px-4 my-2">
        {data.map((item: any, index) => (
          <Col xs={12} sm={12} md={8} lg={4} key={item.id}>
            {/* <Link href={`/product/${item._id}`}> */}
              <div>hakdnwkd</div>
            {/* </Link> */}
          </Col>
        ))}
      </Row>
    </div>
  )
}
export default Home
