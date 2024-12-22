// src/components/ProcurementsPage.tsx
import React, { useEffect } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LabNavigation from '../components/LabNav';
import { BreadCrumbs } from '../components/BreadCrumbs';
import { ROUTE_LABELS, ROUTES } from '../Routes';
import { fetchProcurements, filterProcurements, setStartDate, setEndDate, setStatus } from '../slices/ProcurementsSlice';
import { Orders } from '../api/Api';

const statusMap = {
  1: 'Черновик',
  2: 'Удалён',
  3: 'Сформирован',
  4: 'Завершён'
};

const ProcurementsPage: React.FC = () => {
  const procurements = useSelector((state: any) => state.procurements.procurements);
  const start_date = useSelector((state: any) => state.procurements.date_start);
  const end_date = useSelector((state: any) => state.procurements.date_end);
  const status = useSelector((state: any) => state.procurements.status);
  const user = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProcurements());
  }, []);

  const handleCardClick = (id: number) => {
    navigate(`${ROUTES.PROCUREMENT}/${id}`);
  };

  const handleSearch = () => {
    dispatch(filterProcurements({ start_date, end_date, status }));
  };

  return (
    <Container>
      <LabNavigation company_name="ООО ЛабОборудование" user={user} />
      <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.PROCUREMENT }]} />
      <h2>Накладные</h2>
      <Form>
        <Form.Group controlId="dateStart">
          <Form.Label>Начало даты</Form.Label>
          <Form.Control
            type="text"
            value={start_date || ''}
            onChange={(e) => dispatch(setStartDate(e.target.value))}
          />
        </Form.Group>
        <Form.Group controlId="dateEnd">
          <Form.Label>Конец даты</Form.Label>
          <Form.Control
            type="text"
            value={end_date || ''}
            onChange={(e) => dispatch(setEndDate(e.target.value))}
          />
        </Form.Group>
        <Form.Group controlId="status">
          <Form.Label>Статус заказа</Form.Label>
          <Form.Control
            as="select"
            value={status || ''}
            onChange={(e) => dispatch(setStatus(e.target.value))}
          >
            <option value="">Выберите статус</option>
            {Object.entries(statusMap).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={handleSearch}>
          Поиск
        </Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Адрес</th>
            <th>Телефон</th>
            <th>Дата подачи</th>
            <th>Дата принятия</th>
            <th>Модератор</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          {procurements.map((proc: Orders) => (
            <tr key={proc.id} onClick={() => handleCardClick(proc.id || 1)}>
              <td>{proc.delivery_number}</td>
              <td>{proc.address}</td>
              <td>{proc.phone}</td>
              <td>{proc.submited_date}</td>
              <td>{proc.accepted_date}</td>
              <td>{proc.moderator}</td>
              <td>{statusMap[proc.status]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ProcurementsPage;
