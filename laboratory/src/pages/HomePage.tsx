import { Container, Row, Col } from 'react-bootstrap';
import LabNavigation from '../components/LabNav';
import './HomePage.css'; // Убедитесь, что путь к вашему CSS файлу правильный
import { useSelector } from 'react-redux';
import background_img from './background.jpg';

const HomePage = () => {
  const user = useSelector((state: any) => state.auth);

  return (
    <div>
      <div className="lab-nav">
        <LabNavigation company_name="ООО ЛабОборудование" user={user} />
      </div>
      <div className="homepage-background">
        <Container className="homepage-content">
          <Row>
            <Col md={6} className="homepage-text">
              <h1>Добро пожаловать!</h1>
              <p>
                В онлайн магазине лабораторного оборудования компании ООО ЛабОборудование
                представлен широкий выбор оборудования для лабораторий высокого уровня
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
