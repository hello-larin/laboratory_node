// src/components/OrderPage.js
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container} from 'react-bootstrap';
import ProcurementCard from '../components/ProcurementViewCard';
import { useParams } from 'react-router-dom';
import { Procurement } from '../api/Api';
import { api } from '../api';
import LabNavigation from '../components/LabNav';
import { ROUTE_LABELS, ROUTES } from '../Routes';
import { BreadCrumbs } from '../components/BreadCrumbs';

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
      <BreadCrumbs
        crumbs={[
          { label: ROUTE_LABELS.PROCUREMENT, path: ROUTES.PROCUREMENT },
          { label: pageData?.address || "Оборудование" },
        ]}
      />
      <h1>Ваш заказ</h1>
      <p>Адрес {pageData.address}</p>
      <p>Телефон {pageData.phone}</p>
      <p>Статус {pageData.status}</p>
      {pageData.equipment?.map(item => (
        <ProcurementCard
          key={item.id}
          item={item}
        />
      ))}
    </Container>
  );
};

export default OrderPage;