import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SideBar from "./components/SideBar/SideBar";
import AllContracts from "./pages/Contract/AllContracts";
import Blueprints from "./pages/Blueprint/Blueprints";
import CreateBlueprint from "./pages/CreateBlueprint";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex">
        <SideBar />
        <Routes>
          <Route path="/" element={<Navigate to="/contracts" replace />} />
          <Route path="/contracts" element={<AllContracts />} />
          <Route path="/blueprints" element={<Blueprints />} />
          <Route path="/blueprints/create" element={<CreateBlueprint />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App