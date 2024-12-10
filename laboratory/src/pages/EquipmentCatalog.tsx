import "../style.css";
import { FC, useState, useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import ProcurementButton from "../components/ProcurementButton";
import InputField from "../components/InputField";
import { ROUTES, ROUTE_LABELS } from "../Routes";
import { EquipmentCard } from "../components/EquipmentCard";
import LabNavigation from "../components/LabNav";
import { useNavigate } from "react-router-dom";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { Equipment } from "../api/Api";
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue, setCatalog } from "../slices/CatalogSlice";
import { api } from "../api";
import { setCart } from "../slices/AuthSlice";

const EquipmentCatalog: FC = () => {
    //const [searchValue, setSearchValue] = useState('')
    const [loading, setLoading] = useState(false)
    //const [catalog, setCatalog] = useState<EquipmentResult>()

    const dispatch = useDispatch();
    const searchValue = useSelector((state: any) => state.search.searchValue);
    const catalog = useSelector((state: any) => state.search.catalog);

    const user = useSelector((state: any) => state.auth);

    const navigate = useNavigate();

    const handleSearch = async () => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const { request } = await api.equipment.equipmentList();
          if (request.status === 200) {
            dispatch(setCatalog(JSON.parse(request.response).equipment));
            dispatch(setCart({
              procurement_count: JSON.parse(request.response).procurement_count,
              procurement_id: JSON.parse(request.response).procurement_id 
            }))
            console.log(user)
          }
        } catch (error) {
          console.error('Ошибка при получении данных:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    };

    const handleCardClick = (id: number) => {
        // клик на карточку, переход на страницу оборудования
        navigate(`${ROUTES.EQUIPMENT}/${id}`);
    };

    const addToCart = async (id: number) => {
            setLoading(true);
            try {
              const { request } = await api.equipment.equipmentAddCreate(id.toString(), {
                "amount": 1
              });
              if (request.status === 200) {
                handleSearch();
              }
            } catch (error) {
              console.error('Ошибка при получении данных:', error);
            } finally {
              setLoading(false);
            }
    };

    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            const { request } = await api.equipment.equipmentList();
            if (request.status === 200) {
              dispatch(setCatalog(JSON.parse(request.response).equipment));
            }
          } catch (error) {
            console.error('Ошибка при получении данных:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);

    return (
        <Container>
            <LabNavigation company_name="ООО ЛабОборудование" user={user}/>
            <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.EQUIPMENT }]} />

            <InputField
                value={searchValue}
                setValue={(value) => dispatch(setSearchValue(value))}
                loading={loading}
                onSubmit={handleSearch}
            />

            {loading && ( // здесь можно было использовать тернарный оператор, но это усложняет читаемость
                <div className="loadingBg">
                    <Spinner animation="border" />
                </div>
            )}
            {!loading &&
                (!catalog /* Проверка на существование данных */ ? (
                    <div>
                        <h1>К сожалению, пока ничего не найдено :(</h1>
                    </div>
                ) : (
                    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                        {catalog.map((item: Equipment, index: number) => (
                            <Col key={index}>
                                <EquipmentCard
                                    imageClickHandler={() => handleCardClick(item.id)}
                                    buttonClickHandler={() => addToCart(item.id)}
                                    {...item}
                                />
                            </Col>
                        ))}
                    </Row>
                ))}
        </Container>
    );
};

export default EquipmentCatalog