import "../style.css";
import { FC, useEffect, useState } from "react";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../Routes";
import { useParams } from "react-router-dom";
import { Equipment, getEquipmentById } from "../modules/EquipmentApi";
import LabNavigation from "../components/LabNav";
import { Col, Row, Spinner, Image, Container } from "react-bootstrap";
import default_image from "../1.png";
import { EQUIPMNET_MOCK } from "../modules/mock";


export const EquipmentPage: FC = () => {
  const [pageData, setPageData] = useState<Equipment>();

  const { id } = useParams(); // ид страницы, пример: "/albums/12"

  useEffect(() => {
    if (!id) return;
    getEquipmentById(id)
      .then((response) => setPageData(response))
      .catch(
        () =>
          setPageData(
            EQUIPMNET_MOCK.equipment.find(
              (eq) => String(eq.id) == id
            )
          ) /* В случае ошибки используем мок данные, фильтруем по ид */
      );
  }, [id]);

  return (
    <Container>
      <LabNavigation company_name="ООО ЛабОборудование"/>
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