import "../style.css";
import { FC, useState, useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import InputField from "../components/InputField";
import { ROUTES, ROUTE_LABELS } from "../Routes";
import { EquipmentCard } from "../components/EquipmentCard";
import LabNavigation from "../components/LabNav";
import { useNavigate } from "react-router-dom";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { Equipment } from "../api/Api";
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue, setCatalog, fetchEquipmentList, searchEquipment, addEquipmentToCart } from "../slices/CatalogSlice";
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



    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        dispatch(fetchEquipmentList());
        setLoading(false);
      }
      fetchData()
    }, []);
  
    const handleSearch = async () => {
      dispatch(searchEquipment(searchValue));
    };
  
    const handleCardClick = async (id: number) => {
      navigate(`${ROUTES.EQUIPMENT}/${id}`);
    };
  
    const handleAddToCart = async (id: number) => {
      const resultAction = await dispatch(addEquipmentToCart(id));;
          if (addEquipmentToCart.fulfilled.match(resultAction)) {
            dispatch(searchEquipment(searchValue));
          }
    };

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
                                    imageClickHandler={() => handleCardClick(item.id || 1)}
                                    buttonClickHandler={() => handleAddToCart(item.id || 1)}
                                    equipment={item}
                                />
                            </Col>
                        ))}
                    </Row>
                ))}
        </Container>
    );
};

export default EquipmentCatalog