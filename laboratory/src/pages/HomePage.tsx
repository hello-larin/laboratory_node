import { FC } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../Routes";
import { Button, Col, Container, Row } from "react-bootstrap";
import LabNavigation from "../components/LabNav";
import "../style.css"

export const HomePage: FC = () => {
  return (
    
    <Container>
      <LabNavigation company_name="ООО ЛабОборудование"/>
      <Row>
        <Col md={6}>
          <h1>Добро пожаловать!</h1>
          <p>
            В онлайн магазине лабораторного оборудования компании ООО ЛабОборудование 
            представлен широкий выбор оборудования для лабораторий высокого уровня
          </p>
          <Link to={ROUTES.EQUIPMENT}>
            <Button variant="primary">Просмотреть каталог</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};