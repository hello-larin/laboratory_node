import React, { FC, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Props {
    id: number;
    imageUrl: string;
    title: string;
    price: number;
    quantity: number;
    onIncrease?: () => void;
    onDecrease?: () => void;
  }

const HorizontalCard : FC<Props> = ({
    id,
    imageUrl,
    title,
    price,
    quantity,
    onIncrease,
    onDecrease,
  }) => {
  return (
    <Card style={{ display: 'flex', flexDirection: 'row', margin: '1rem' }}>
      <Card.Img variant="top" src={imageUrl} style={{ width: '200px', height: 'auto' }} />
      <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1rem' }}>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          Цена: {price} руб.
        </Card.Text>
      </Card.Body>
      <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
        <Button variant="outline-primary" onClick={onDecrease}>-</Button>
        <span style={{ margin: '0.5rem' }}>{quantity}</span>
        <Button variant="outline-primary" onClick={onIncrease}>+</Button>
      </Card.Body>
    </Card>
  );
};

export default HorizontalCard;
