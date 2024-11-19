import { FC } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './../style.css'
import cart from '../cart.svg'

interface Props {
  amount: number
}

const ProcurementButton: FC<Props> = ({ amount }) => (
    <Container className="">
      <Row className="justify-content-end">
      <Col xs="auto">
    <a className='btn btn-primary'><img src={cart}></img> {amount}</a>
    </Col>
    </Row>
  </Container>
)

export default ProcurementButton