import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../slices/AuthSlice';
import LabNavigation from '../components/LabNav';
import { api } from '../api';

const ProfilePage: React.FC = () => {
    const store_username = useSelector((state: any) => state.auth.user.username);
    const store_last_name = useSelector((state: any) => state.auth.user.last_name);
    const store_first_name = useSelector((state: any) => state.auth.first_name);
    const [username, setUsername] = useState(store_username);
    const [last_name, setLast_name] = useState(store_last_name);
    const [first_name, setFirst_name] = useState(store_first_name);
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.auth);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const { request } = await api.user.userUpdate({
            "username": username,
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
            <h2>Profile</h2>
            <Form onSubmit={handleSubmit}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                        placeholder="first name"
                        value={first_name}
                        onChange={(e) => setFirst_name(e.target.value)}
                    />
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                        placeholder="last name"
                        value={last_name}
                        onChange={(e) => setLast_name(e.target.value)}
                    />
                    <Button variant="primary" type="submit">
                    Edit
                    </Button>
            </Form>
        </Container>
    );
};

export default ProfilePage;
