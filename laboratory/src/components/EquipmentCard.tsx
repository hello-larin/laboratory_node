import { FC } from 'react'
import { Button, Card } from 'react-bootstrap'
import './../style.css'
import default_image from "../1.png";

interface Props {
    image: string | null
    name: string
    price: number
    id: number
    imageClickHandler: () => void;
    buttonClickHandler: () => void;
}

export const EquipmentCard: FC<Props> = ({
    name,
    price,
    image,
    imageClickHandler,
    buttonClickHandler,
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
            <Button onClick={buttonClickHandler}>Добавить</Button>
        </Card.Body>
      </Card>
    );
  };