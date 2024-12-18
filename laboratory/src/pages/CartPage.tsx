import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Form } from 'react-bootstrap';
import HorizontalCard from '../components/ProcurementCard';
import { api } from '../api';
import LabNavigation from '../components/LabNav';
import { Procurement } from '../api/Api';
import { setAddress, setPhone } from '../slices/CurrentProcurementSlice';
import { useNavigate } from 'react-router-dom';
import { ROUTE_LABELS, ROUTES } from '../Routes';
import { clearCart, setCartCount } from '../slices/AuthSlice';
import { BreadCrumbs } from '../components/BreadCrumbs';

const CartPage = () => {
    const [pageData, setPageData] = useState<Procurement | undefined>(undefined);
    const user = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();
    const address = useSelector((state: any) => state.currentProcurement.address);
    const phone = useSelector((state: any) => state.currentProcurement.phone);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const { request } = await api.procurements.procurementsUpdate(user.procurement_id,
             { address: address,
               phone: phone
              });
        if (request.status === 200) {
            fetchData();
            SubmitProcurement();
        }
    }

    const SubmitProcurement = async () => {
        const { request } = await api.procurements.procurementsSubmitCreate(user.procurement_id);
        if (request.status === 200) {
            dispatch(clearCart());
            navigate(`${ROUTES.PROCUREMENT}`);
        }
    }

    const handleAddClick = async (id: string) => {
        const { request } = await api.item.itemUpdate(id, { amount: 1 });
        if (request.status === 200) {
            fetchData();
        }
    };

    const handleDecClick = async (id: string) => {
        const { request } = await api.item.itemUpdate(id, { amount: -1 });
        if (request.status === 200) {
            fetchData();
        }
    };

    const fetchData = async () => {
        const { request } = await api.procurements.procurementsRead(user.procurement_id);
        if (request.status === 200) {
            setPageData(JSON.parse(request.response));
        }
    };

    const fetchDataID = async () => {
        const { request } = await api.procurements.procurementsRead(user.procurement_id);
        if (request.status === 200) {
            setPageData(JSON.parse(request.response));
            dispatch(setAddress(JSON.parse(request.response).address));
            dispatch(setPhone(JSON.parse(request.response).phone));
        }
    };

    useEffect(() => {
        if (user.procurement_id === -1) return;
        fetchDataID();
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
