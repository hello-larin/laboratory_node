import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Form } from 'react-bootstrap';
import HorizontalCard from '../components/ProcurementCard';
import LabNavigation from '../components/LabNav';
import { useNavigate } from 'react-router-dom';
import { ROUTE_LABELS, ROUTES } from '../Routes';
import { BreadCrumbs } from '../components/BreadCrumbs';
import { api } from '../api';
import { setAddress, setPhone } from '../slices/CurrentProcurementSlice';
import { clearCart, setCartCount } from '../slices/AuthSlice';

// Thunk to update procurement
export const updateProcurement = (procurementId, address, phone) => async (dispatch) => {
    const { request } = await api.procurements.procurementsUpdate(procurementId, { address, phone });
    if (request.status === 200) {
        dispatch(fetchProcurementData(procurementId));
        dispatch(submitProcurement(procurementId));
    }
};

// Thunk to submit procurement
export const submitProcurement = (procurementId) => async (dispatch) => {
    const { request } = await api.procurements.procurementsSubmitCreate(procurementId);
    if (request.status === 200) {
        dispatch(clearCart());
        // Navigate to the procurement page
        // This navigation logic should be handled in the component
    }
};

// Thunk to update item amount
export const updateItemAmount = (itemId, amount) => async (dispatch) => {
    const { request } = await api.item.itemUpdate(itemId, { amount });
    if (request.status === 200) {
        dispatch(fetchProcurementData(procurementId));
    }
};

// Thunk to fetch procurement data
export const fetchProcurementData = (procurementId) => async (dispatch) => {
    const { request } = await api.procurements.procurementsRead(procurementId);
    if (request.status === 200) {
        const data = JSON.parse(request.response);
        dispatch(setAddress(data.address));
        dispatch(setPhone(data.phone));
        return data;
    }
    return null;
};

const CartPage = () => {
    const [pageData, setPageData] = useState(null);
    const user = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const address = useSelector((state) => state.currentProcurement.address);
    const phone = useSelector((state) => state.currentProcurement.phone);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.procurement_id === -1) return;
        const fetchData = async () => {
            const data = await dispatch(fetchProcurementData(user.procurement_id));
            setPageData(data);
        };
        fetchData();
    }, [user.procurement_id, dispatch]);

    useEffect(() => {
        if (pageData?.equipment && pageData.equipment.length <= 0) {
            dispatch(setCartCount(0));
            navigate(ROUTES.EQUIPMENT);
        }
    }, [pageData, dispatch, navigate]);

    const handleSubmit = () => {
        dispatch(updateProcurement(user.procurement_id, address, phone));
    };

    const handleAddClick = (id) => {
        dispatch(updateItemAmount(id, 1));
    };

    const handleDecClick = (id) => {
        dispatch(updateItemAmount(id, -1));
    };

    if (!pageData) {
        return <div>Загрузка...</div>;
    }

    return (
        <Container>
            <LabNavigation company_name="ООО ЛабОборудование" user={user} />
            <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.CART }]} />
            <h2>Ваш заказ</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="address">
                    <Form.Label>Адрес</Form.Label>
                    <Form.Control
                        type="text"
                        value={address}
                        onChange={(e) => dispatch(setAddress(e.target.value))}
                    />
                </Form.Group>
                <Form.Group controlId="phone">
                    <Form.Label>Телефон</Form.Label>
                    <Form.Control
                        type="text"
                        value={phone}
                        onChange={(e) => dispatch(setPhone(e.target.value))}
                    />
                </Form.Group>
                {pageData.equipment?.map((item) => (
                    <HorizontalCard
                        key={item.id}
                        item={item}
                        onIncrease={() => handleAddClick('' + item.id)}
                        onDecrease={() => handleDecClick('' + item.id)}
                    />
                ))}
                <Button variant="primary" onClick={handleSubmit}>
                    Сформировать
                </Button>
            </Form>
        </Container>
    );
};

export default CartPage;
