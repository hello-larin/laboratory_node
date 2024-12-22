import { BrowserRouter, Route, Routes } from "react-router-dom";
import EquipmentCatalog from "./pages/EquipmentCatalog";
import { EquipmentPage } from "./pages/EquipmentPage";
import { ROUTES } from "./Routes";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter basename="/laboratory_node">
      <Routes>
      <Route path={ROUTES.HOME} index element={<HomePage />} />
        <Route path={ROUTES.EQUIPMENT} element={<EquipmentCatalog />} />
        <Route path={`${ROUTES.EQUIPMENT}/:id`} element={<EquipmentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;