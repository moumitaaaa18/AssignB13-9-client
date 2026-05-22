import { Routes, Route } from "react-router";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import AvailableCars from "./pages/AvailableCars";
import CarDetails from "./pages/CarDetails";
import AddCar from "./pages/AddCar";
import MyCars from "./pages/MyCars";
import UpdateCar from "./pages/UpdateCar";
import MyBookings from "./pages/MyBookings";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="available-cars" element={<AvailableCars />} />
        <Route path="cars/:id" element={<CarDetails />} />
        <Route path="add-car" element={<AddCar />} />
        <Route path="my-cars" element={<MyCars />} />
        <Route path="update-car/:id" element={<UpdateCar />} />
        <Route path="my-bookings" element={<MyBookings />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;