import { FC } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import './../style.css';
import { Link, useNavigate } from "react-router-dom";
import { ROUTES, ROUTE_LABELS } from "./../Routes";
import { User } from '../api/Api';
import { api } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { setProcurement } from '../slices/ProcurementSlice';
import ProcurementButton from './ProcurementButton';
import { logout } from '../slices/AuthSlice';

interface Props {
  company_name: string;
  user: {
    user: User | null;
    isAuthenticated: boolean;
    procurement_id: number;
    procurement_count: number;
  };
}

const LabNavigation: FC<Props> = ({ company_name, user }) => {
  const current_user = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();  
  const handleLogout = async ()  => {
    console.log("LabNavigator")
    console.log(user)
    const {request} = await api.logout.logoutCreate();
    if (request.status == 200)
      dispatch(logout())
      navigate(`${ROUTES.EQUIPMENT}`);
  };

  const handleCart = async () => {
    const {request} = await api.procurements.procurementsRead('' + user.procurement_id);
    if (request.status == 200){
      dispatch(setProcurement(request.response))
      navigate(`${ROUTES.CART}`);
    }
  };
  console.log(current_user);
  return (
    <>
    <Navbar key="md" expand="md" className='myheader bg-body-tertiary mb-3'>
      <Container>
        <Navbar.Brand href="/"><Link to={ROUTES.HOME || ""}>{company_name}</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="justify-content-end">
            <Nav.Link><Link to={ROUTES.HOME || ""}>{ROUTE_LABELS.HOME}</Link></Nav.Link>
            <Nav.Link><Link to={ROUTES.EQUIPMENT || ""}>{ROUTE_LABELS.EQUIPMENT}</Link></Nav.Link>
            {user.isAuthenticated ? (
              <>
                <Nav.Link><Link to={ROUTES.PROFILE || ""}>{user.user?.username}</Link></Nav.Link>
                <Nav.Link onClick={handleLogout}><Link to={ROUTES.LOGOUT || ""}>{ROUTE_LABELS.LOGOUT}</Link></Nav.Link>
                <Nav.Link><Link to={ROUTES.PROCUREMENT || ""}>{ROUTE_LABELS.PROCUREMENT}</Link></Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link><Link to={ROUTES.LOGIN || ""}>{ROUTE_LABELS.LOGIN}</Link></Nav.Link>
                <Nav.Link><Link to={ROUTES.REGISTER || ""}>{ROUTE_LABELS.REGISTER}</Link></Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {user.procurement_count > 0 ? (<ProcurementButton amount={user.procurement_count} buttonClickHandler={handleCart}/>) : null}
    </>
  );
};

export default LabNavigation;
