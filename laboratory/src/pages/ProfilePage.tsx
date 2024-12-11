import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../slices/AuthSlice';
import LabNavigation from '../components/LabNav';
import { api } from '../api';
import { BreadCrumbs } from '../components/BreadCrumbs';
import { ROUTE_LABELS } from '../Routes';

const ProfilePage: React.FC = () => {
    const store_last_name = useSelector((state: any) => state.auth.user.last_name);
    const store_first_name = useSelector((state: any) => state.auth.user.first_name);
    const [last_name, setLast_name] = useState(store_last_name);
    const [first_name, setFirst_name] = useState(store_first_name);
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.auth);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const { request } = await api.user.userUpdate({
            "password": password,
            "last_name": last_name,
            "first_name": first_name
        })
        if (request.status == 200) {
            console.log(request.response)
            dispatch(setUser(JSON.parse(request.response)))
            console.log(user.username)
        }
    };
    return (
        <Container>
            <LabNavigation company_name="ООО ЛабОборудование" user={user}/>
            <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.PROFILE }]} />
            <h2>Профиль {user.username}</h2>
            <Form onSubmit={handleSubmit}>
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                        placeholder="Пароль"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Form.Label>Имя</Form.Label>
                    <Form.Control
                        placeholder="Введите имя"
                        value={first_name}
                        onChange={(e) => setFirst_name(e.target.value)}
                    />
                    <Form.Label>Фамилия</Form.Label>
                    <Form.Control
                        placeholder="Введите фамилию"
                        value={last_name}
                        onChange={(e) => setLast_name(e.target.value)}
                    />
                    <Button variant="primary" type="submit">
                    Редактировать
                    </Button>
            </Form>
        </Container>
    );
};

export default ProfilePage;
