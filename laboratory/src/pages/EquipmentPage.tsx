import "../style.css";
import { FC, useEffect, useState } from "react";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../Routes";
import { useParams } from "react-router-dom";
import LabNavigation from "../components/LabNav";
import { api } from "../api";
import { Col, Row, Spinner, Image, Container } from "react-bootstrap";
import default_image from "../1.png";
import { useSelector } from "react-redux";
import { Equipment } from "../api/Api";


export const EquipmentPage: FC = () => {
  const [pageData, setPageData] = useState<Equipment | undefined>(undefined);
  const user = useSelector((state: any) => state.auth);

  const { id } = useParams(); // ид страницы, пример: "/albums/12"

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const { request } = await api.equipment.equipmentRead(id);
        if (request.status == 200) {
          setPageData(JSON.parse(request.response))
        }
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Container>
      <LabNavigation company_name="ООО ЛабОборудование" user={user}/>
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