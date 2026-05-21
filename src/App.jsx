import { Routes, Route } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import AvailableCars from "./pages/AvailableCars";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="available-cars" element={<AvailableCars />} />
      </Route>
    </Routes>
  );
}

export default App;