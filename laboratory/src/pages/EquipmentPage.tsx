import "../style.css";
import { FC, useEffect } from "react";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../Routes";
import { useParams } from "react-router-dom";
import LabNavigation from "../components/LabNav";
import { Col, Row, Spinner, Image, Container } from "react-bootstrap";
import default_image from "../1.png";
import { useDispatch, useSelector } from 'react-redux';
import { fetchEquipment } from '../slices/EquipmentSlice';

export const EquipmentPage: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth);
  const pageData = useSelector((state) => state.equipment.currentEquipment);
  const { id } = useParams(); // ид страницы, пример: "/albums/12"
  
  const fetchData = async (id : string) => {
    if (id) {
      await dispatch(fetchEquipment(id));
    }
  };

  useEffect(() => {
    fetchData(id)
  }, [id, dispatch]);

  return (
    <Container>
      <LabNavigation company_name="ООО ЛабОборудование" user={user} />
      <BreadCrumbs
        crumbs={[
          { label: ROUTE_LABELS.EQUIPMENT, path: ROUTES.EQUIPMENT },
          { label: pageData?.name || "Оборудование" },
        ]}
      />
      {pageData ? ( // проверка на наличие данных, иначе загрузка
      <Row>
        <Col md={6}>
        <Image src={pageData.image || default_image}></Image>
        </Col>
        <Col md={6}>
        <h2>{pageData.name}</h2>
        <p>{pageData.description}</p>
            <p className="price">{pageData.price} P</p>
        </Col>
      </Row>

      ) : (
        <div className="album_page_loader_block">{/* загрузка */}
          <Spinner animation="border" />
        </div>
      )}
    </Container>
  );
};

export default EquipmentPage;