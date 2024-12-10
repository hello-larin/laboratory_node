import React from 'react';
import { useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { api } from '../api';
import { setProcurements } from '../slices/ProcurementsSlice';
import { ROUTES } from '../Routes';
import { useNavigate } from 'react-router-dom';
import LabNavigation from '../components/LabNav';


const ProcurementsPage: React.FC = () => {
    const procurements = useSelector((state: any) => state.procurements.procurements);
    const user = useSelector((state: any) => state.auth);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
              const { request } = await api.procurements.procurementsList();
              if (request.status == 200) {
                dispatch(setProcurements(JSON.parse(request.response)))
                console.log(procurements)
              }
          };
      
          fetchData();
    }, [])

    const handleCardClick = (id: number) => {
        // клик на карточку, переход на страницу оборудования
        navigate(`${ROUTES.PROCUREMENT}/${id}`);
    };

    return (
        <Container>
            <LabNavigation company_name="ООО ЛабОборудование" user={user}/>
            <h2>Накладные</h2>
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
                    {procurements.map((proc, index) => (
                        <tr key={proc.id} onClick={() => handleCardClick(proc.id)}>
                            <td>{index + 1}</td>
                            <td>{proc.address}</td>
                            <td>{proc.phone}</td>
                            <td>{proc.submited_date}</td>
                            <td>{proc.accepted_date}</td>
                            <td>{proc.moderator}</td>
                            <td>{proc.status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default ProcurementsPage;
