import "../style.css";
import { FC, useState, useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { Equipment, EquipmentResult, getEquipmentByPrice } from "../modules/EquipmentApi";
import InputField from "../components/InputField";
import { ROUTES, ROUTE_LABELS } from "../Routes";
import { EquipmentCard } from "../components/EquipmentCard";
import LabNavigation from "../components/LabNav";
import { useNavigate } from "react-router-dom";
import { BreadCrumbs } from "../components/BreadCrumbs";

import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from "../slices/CatalogSlice";

const EquipmentCatalog: FC = () => {
    //const [searchValue, setSearchValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [catalog, setCatalog] = useState<EquipmentResult>()

    const dispatch = useDispatch();
    const searchValue = useSelector((state: any) => state.search.searchValue);

    const navigate = useNavigate();

    const handleSearch = async () => {
        setLoading(true)
            getEquipmentByPrice(searchValue)
            .then((response) => setCatalog(response))
            setLoading(false)
        //setLoading(true)
        //getEquipmentByPrice(searchValue)
        //.then((response) => setCatalog(response))
        //setLoading(false)
    };

    const handleCardClick = (id: number) => {
        // клик на карточку, переход на страницу оборудования
        navigate(`${ROUTES.EQUIPMENT}/${id}`);
    };

    useEffect(() => {
        setLoading(true)
        getEquipmentByPrice(searchValue)
        .then((response) => setCatalog(response))
        setLoading(false)
    }, [])

    return (
        <Container>
            <LabNavigation company_name="ООО ЛабОборудование"/>
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
                        {catalog?.equipment.map((item: Equipment, index: number) => (
                            <Col key={index}>
                                <EquipmentCard
                                    imageClickHandler={() => handleCardClick(item.id)}
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
