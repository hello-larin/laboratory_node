import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Form } from 'react-bootstrap';
import HorizontalCard from '../components/ProcurementCard';
import { api } from '../api';
import LabNavigation from '../components/LabNav';
import { Procurement } from '../api/Api';
import { setAddress, setPhone } from '../slices/CurrentProcurementSlice';
import { ROUTE_LABELS, ROUTES } from '../Routes';
import { setCartCount } from '../slices/AuthSlice';
import { BreadCrumbs } from '../components/BreadCrumbs';
import { updateProcurement, updateItemAmount, fetchProcurementData } from './cartapi';
import { useNavigate } from 'react-router-dom';


const CartPage = () => {
    const [pageData, setPageData] = useState<Procurement | undefined>(undefined);
    const user = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const address = useSelector((state: any) => state.currentProcurement.address);
    const phone = useSelector((state: any) => state.currentProcurement.phone);

    const handleSubmit = async () => {
        if (dispatch(updateProcurement(user.procurement_id, address, phone))) {
            navigate(`${ROUTES.EQUIPMENT}`)
        }
    }

    const handleAddClick = async (id: string) => {
        dispatch(updateItemAmount(id, 1));
    };

    const handleDecClick = async (id: string) => {
        dispatch(updateItemAmount(id, -1));
    };

    const fetchData = async () => {
        if (user.procurement_id === -1) return;
        const fetchData = async () => {
            const data = await dispatch(fetchProcurementData(user.procurement_id));
            setPageData(data);
        };
    };

    useEffect(() => {
        if (user.procurement_id === -1) return;
        fetchData();
        console.log(address, phone)
    }, [user.procurement_id]);

    useEffect(() => {
        if (pageData?.equipment && pageData.equipment.length <= 0) {
            dispatch(setCartCount(0))
            navigate(`${ROUTES.EQUIPMENT}`);
        }
    }, [pageData]);

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
