import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from "../slices/AuthSlice";
import { api } from '../api';
import LabNavigation from '../components/LabNav';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const user = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const loginResponse = await api.login.loginCreate({
              username,
              password,
            });
      
            if (loginResponse.request.status === 200) {
              console.log(loginResponse.request.response);
              dispatch(setUser(JSON.parse(loginResponse.request.response)));
              console.log(user.username);
      
              const equipmentResponse = await api.equipment.equipmentList();
              if (equipmentResponse.request.status === 200) {
                // Обработка успешного ответа
                console.log(equipmentResponse.request.response);
              } else {
                console.error('Ошибка при получении списка оборудования:', equipmentResponse.request.response);
              }
            } else {
              console.error('Ошибка при входе:', loginResponse.request.response);
            }
          } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
          }
    };

    return (
        <Container>
            <LabNavigation company_name="ООО ЛабОборудование" user={user}/>
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </Container>
    );
};

export default LoginPage;
