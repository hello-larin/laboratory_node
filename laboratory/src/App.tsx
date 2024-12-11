import { BrowserRouter, Route, Routes } from "react-router-dom";
import EquipmentCatalog from "./pages/EquipmentCatalog";
import { EquipmentPage } from "./pages/EquipmentPage";
import { ROUTES } from "./Routes";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegistreationPage";
import ProfilePage from "./pages/ProfilePage";
import ProcurementsPage from "./pages/ProcurementsPage";
import OrderPage from "./pages/ProcurementPage";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path={ROUTES.HOME} index element={<HomePage />} />
        <Route path={ROUTES.EQUIPMENT} element={<EquipmentCatalog />} />
        <Route path={`${ROUTES.EQUIPMENT}/:id`} element={<EquipmentPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage/>} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage/>} />
        <Route path={ROUTES.PROCUREMENT} element={<ProcurementsPage/>} />
        <Route path={`${ROUTES.PROCUREMENT}/:id`} element={<OrderPage />} />
        <Route path={`${ROUTES.CART}`} element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;