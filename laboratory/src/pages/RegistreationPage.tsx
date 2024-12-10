import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

import { api } from '../api';
import LabNavigation from '../components/LabNav';
import { useSelector } from 'react-redux';

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [created, setCreated] = useState(false);
    const [error, setError] = useState(false);
    const user = useSelector((state: any) => state.auth);


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const { request } = await api.registration.registrationCreate({
            "username": username,
            "password": password
        })
        if (request.status == 200) {
            setCreated(true);
        } else {
            setError(true);
        }
        console.log(request.data);
    };

    return (
        <Container className="mt-5">
            <LabNavigation company_name="ООО ЛабОборудование" user={user}/>
            <h2>Register</h2>
            {created && <Alert variant='success'>Пользователь успешно создан</Alert>}
            {error && <Alert variant='error'>При создании пользователя произошла ошибка</Alert>}
            <Form onSubmit={handleSubmit}>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="username"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </Container>
    );
};

export default RegisterPage;
