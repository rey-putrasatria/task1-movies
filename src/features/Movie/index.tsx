import { Layout } from '@/components'
import { Col, Row } from 'antd'
import useGetMovie from './hooks'
import CardMovie from './sections/CardMovie'

const MovieFeature = () => {
  const { data } = useGetMovie()
  return (
    <Layout>
      <div>
        <Row gutter={[16, 16]} className="lg:px-12 md:px-6 sm:px-6 px-4 my-2">
          {data.map((item: any, index) => (
            <Col xs={12} sm={12} md={8} lg={4} key={item.id}>
              {/* <Link href={`/product/${item._id}`}> */}
              <CardMovie data={item} />
              {/* </Link> */}
            </Col>
          ))}
        </Row>
      </div>
    </Layout>
  )
}
export default MovieFeature
