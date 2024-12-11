import { FC } from 'react'
import { Button, Card } from 'react-bootstrap'
import './../style.css'
import default_image from "../1.png";
import { Equipment } from '../api/Api';

interface Props {
    equipment: Equipment
    imageClickHandler: () => void;
    buttonClickHandler: () => void;
}

export const EquipmentCard: FC<Props> = ({
    equipment,
    imageClickHandler,
    buttonClickHandler,
  }) => {
  
    return (
      <Card className='mycard'>
        <Card.Img
          variant="top"
          src={equipment.image || default_image}
          onClick={imageClickHandler}
        />
        <Card.Body>
            <Card.Title onClick={imageClickHandler}>{equipment.name}</Card.Title>
            <Card.Text>{equipment.price}</Card.Text>
            <Button onClick={buttonClickHandler}>Добавить</Button>
        </Card.Body>
      </Card>
    );
  };