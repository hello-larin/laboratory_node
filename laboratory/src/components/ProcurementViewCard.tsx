import React, { FC, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import default_image from "../1.png";


interface Props {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  quantity: number;
}

const ProcurementCard: FC<Props> = ({
  id,
  imageUrl,
  title,
  price,
  quantity,
}) => {
  return (
    <Card style={{ display: 'flex', flexDirection: 'row', margin: '1rem' }}>
      <Card.Img variant="top" src={imageUrl | default_image} style={{ width: '200px', height: 'auto' }} />
      <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '1rem' }}>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          Цена: {price} руб.
        </Card.Text>
      </Card.Body>
      <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
        <span style={{ margin: '0.5rem' }}>{quantity}</span>
      </Card.Body>
    </Card>
  );
};

export default ProcurementCard;
