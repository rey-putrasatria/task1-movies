import { Layout } from '@/components'
import CardMovie from '@/components/CardMovie'
import useGetMovie from '@/hooks/useGetMovie'
import { Col, Row } from 'antd'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

const Movie: React.FC<NextPage> = () => {
  const router = useRouter()
  const { request_token } = router.query
  const { data } = useGetMovie()

  return (
    <Layout>
      <div>
        <Row gutter={[16, 16]} className="lg:px-12 md:px-6 sm:px-6 px-4 my-2">
          {data.map((item: any, index) => (
            <Col xs={12} sm={12} md={8} lg={4} key={item.id}>
              {/* <Link href={`/product/${item._id}`}> */}
              <CardMovie data={item}/>
              {/* </Link> */}
            </Col>
          ))}
        </Row>
      </div>
    </Layout>
  )
}
export default Movie
