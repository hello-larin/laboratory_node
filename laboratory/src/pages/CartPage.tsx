// src/components/OrderPage.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { setItems } from '../slices/ProcurementSlice';
import HorizontalCard from '../components/ProcurementCard';
import { Procurement } from '../api/Api';
import { api } from '../api';
import LabNavigation from '../components/LabNav';

const CartPage = () => {
    const dispatch = useDispatch();
    const [pageData, setPageData] = useState<Procurement | undefined>(undefined);
    const user = useSelector((state: any) => state.auth);

    const handleAddClick = async (id: number) => {
        const { request } = await api.equipment.equipmentAddCreate(id.toString(), {
            "amount": 1
          });
        if (request.status == 200)
            dispatch(setItems(request.response))
    };
    const handleDecClick = async (id: number) => {
        const { request } = await api.equipment.equipmentAddCreate(id.toString(), {
            "amount": -1
          });
        if (request.status == 200)
            dispatch(setItems(request.response))
    };

    useEffect(() => {
        if (user.procurement_id == -1) return;

        const fetchData = async () => {
            try {
                const { request } = await api.procurements.procurementsRead(user.procurement_id);
                if (request.status === 200) {
                    setPageData(JSON.parse(request.response));
                }
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchData();
    }, []);

    if (!pageData) {
        return <div>Загрузка...</div>;
    }

    return (
        <Container>
            <LabNavigation company_name="ООО ЛабОборудование" user={user} />
            <h1>Ваш заказ</h1>
            {pageData.equipment?.map(item => (
                <HorizontalCard
                    id={item.id}
                    imageUrl={item.image}
                    title={item.name}
                    price={item.price}
                    quantity={item.amount}
                    onIncrease={() => handleAddClick(item.id)}
                    onDecrease={() => handleDecClick(item.id)}
                />
            ))}
        </Container>
    );
};

export default CartPage;
