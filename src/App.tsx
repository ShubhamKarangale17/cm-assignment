import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SideBar from "./components/SideBar/SideBar";
import AllContracts from "./pages/Contract/AllContracts";
import CreateContract from "./pages/Contract/CreateContract";
import ViewContract from "./pages/Contract/ViewContract";
import Blueprints from "./pages/Blueprint/Blueprints";
import CreateBlueprint from "./pages/Blueprint/CreateBlueprint";
import ViewBlueprint from "./pages/Blueprint/ViewBlueprint";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex">
        <SideBar />
        <div className="ml-80 w-full">
          <Routes>
            <Route path="/" element={<Navigate to="/contracts" replace />} />
            <Route path="/contracts" element={<AllContracts />} />
            <Route path="/contracts/create" element={<CreateContract />} />
            <Route path="/contracts/view/:id" element={<ViewContract />} />
            <Route path="/blueprints" element={<Blueprints />} />
            <Route path="/blueprints/create" element={<CreateBlueprint />} />
            <Route path="/blueprints/view/:id" element={<ViewBlueprint />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App