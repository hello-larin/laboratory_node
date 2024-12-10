// src/components/OrderPage.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { setProcurement } from '../slices/ProcurementSlice';
import ProcurementCard from '../components/ProcurementViewCard';
import { useParams } from 'react-router-dom';
import { Procurement } from '../api/Api';
import { api } from '../api';
import LabNavigation from '../components/LabNav';

const OrderPage = () => {
  const [pageData, setPageData] = useState<Procurement | undefined>(undefined);
  const { id } = useParams(); // ид страницы, пример: "/albums/12"
  const user = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const { request } = await api.procurements.procurementsRead(id);
        if (request.status === 200) {
          setPageData(JSON.parse(request.response));
        }
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!pageData) {
    return <div>Загрузка...</div>;
  }

  return (
    <Container>
      <LabNavigation company_name="ООО ЛабОборудование" user={user} />
      <h1>Ваш заказ</h1>
      <p>Адрес {pageData.address}</p>
      <p>Телефон {pageData.phone}</p>
      <p>Статус {pageData.status}</p>
      {pageData.equipment?.map(item => (
        <ProcurementCard
          key={item.id}
          id={item.id?.toString()}
          imageUrl={item.image}
          title={item.name}
          price={item.price?.toString()}
          quantity={item.amount}
        />
      ))}
    </Container>
  );
};

export default OrderPage;
