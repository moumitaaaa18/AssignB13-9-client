import { Routes, Route } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import AvailableCars from "./pages/AvailableCars";
import CarDetails from "./pages/CarDetails";

function App() {
  return (
    <Routes>
      <Route path="cars/:id" element={<CarDetails />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="available-cars" element={<AvailableCars />} />
      </Route>
    </Routes>
  );
}

export default App;