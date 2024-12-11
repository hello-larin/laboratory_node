import { FC } from 'react';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import default_image from "../1.png";
import { Items } from '../api/Api';


interface Props {
  item: Items
}

const ProcurementCard: FC<Props> = ({
  item
}) => {
  return (
    <Card style={{ display: 'flex', flexDirection: 'row', margin: '1rem' }}>
      <Card.Img variant="top" src={item.image || default_image} style={{ width: '200px', height: 'auto' }} />
      <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1rem' }}>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>
          Цена: {item.price} руб.
        </Card.Text>
      </Card.Body>
      <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
        <span style={{ margin: '0.5rem' }}>{item.amount}</span>
      </Card.Body>
    </Card>
  );
};

export default ProcurementCard;
