import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { setProcurement } from '../slices/ProcurementSlice';
import HorizontalCard from '../components/ProcurementCard';
import { api } from '../api';
import LabNavigation from '../components/LabNav';

const CartPage = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.procurement.procurement);
    const user = useSelector((state) => state.auth);

    const handleAddClick = async (id) => {
        const { request } = await api.item.itemUpdate(id, { amount: 1 });
        if (request.status === 200) {
            fetchData();
        }
    };

    const handleDecClick = async (id) => {
        const { request } = await api.item.itemUpdate(id, { amount: -1 });
        if (request.status === 200) {
            fetchData();
        }
    };

    const fetchData = async () => {
        const { request } = await api.procurements.procurementsRead(user.procurement_id);
        if (request.status === 200) {
            dispatch(setProcurement(JSON.parse(request.response)));
        }
    };

    useEffect(() => {
        if (user.procurement_id === -1) return;
        fetchData();
    }, [user.procurement_id]);

    if (!cart) {
        return <div>Загрузка...</div>;
    }

    return (
        <Container>
            <LabNavigation company_name="ООО ЛабОборудование" user={user} />
            <h1>Ваш заказ</h1>
            {cart.equipment.map((item) => (
                <HorizontalCard
                    key={item.id}
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
