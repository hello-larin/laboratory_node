import { FC } from 'react'
import { Button, Card } from 'react-bootstrap'
import './../style.css'
import default_image from "../1.png";

interface Props {
    image: string
    name: string
    price: number
    id: number
    imageClickHandler: () => void;
    addToProcurement: () => void;
}

export const EquipmentCard: FC<Props> = ({
    id,
    name,
    price,
    image,
    imageClickHandler,
    addToProcurement
  }) => {
  
    return (
      <Card className='mycard'>
        <Card.Img
          variant="top"
          src={image || default_image}
          onClick={imageClickHandler}
        />
        <Card.Body>
            <Card.Title onClick={imageClickHandler}>{name}</Card.Title>
            <Card.Text>{price}</Card.Text>
        </Card.Body>
      </Card>
    );
  };