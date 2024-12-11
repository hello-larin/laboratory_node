import { FC } from 'react';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Items } from '../api/Api';

interface Props {
    item: Items;
    onIncrease?: () => void;
    onDecrease?: () => void;
}

const HorizontalCard: FC<Props> = ({
    item,
    onIncrease,
    onDecrease,
}) => {
    return (
        <Card style={{ display: 'flex', flexDirection: 'row', margin: '1rem' }}>
            <Card.Img variant="top" src={item.image} style={{ width: '200px', height: 'auto' }} />
            <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1rem' }}>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                    Цена: {item.price} руб.
                </Card.Text>
            </Card.Body>
            <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
                <Button variant="outline-primary" onClick={onDecrease}>-</Button>
                <span style={{ margin: '0.5rem' }}>{item.amount}</span>
                <Button variant="outline-primary" onClick={onIncrease}>+</Button>
            </Card.Body>
        </Card>
    );
};

export default HorizontalCard;
