import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, setCart, setUser } from "../slices/AuthSlice";
import { api } from '../api';
import LabNavigation from '../components/LabNav';
import { useNavigate } from 'react-router-dom';
import { ROUTE_LABELS, ROUTES } from '../Routes';
import { BreadCrumbs } from '../components/BreadCrumbs';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const resultAction = dispatch(loginUser({username:username, password:password}))
    if (loginUser.fulfilled.match(resultAction)) {
      navigate(`${ROUTES.PROCUREMENT}`);
    }
  };

  return (
    <Container>
      <LabNavigation company_name="ООО ЛабОборудование" user={user} />
      <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.LOGIN }]} />
      <h2>Авторизация</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Логин</Form.Label>
          <Form.Control
            placeholder="Введите логин"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Войти
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
