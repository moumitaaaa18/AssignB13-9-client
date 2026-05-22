import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const MyCars = () => {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    if (!user?.email) {
      setCars([]);
      return;
    }

    fetch(`http://https://assign-b13-9-server-g6yqnhpe1-moumitaaaa18s-projects.vercel.app/my-cars?email=${user.email}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setCars(Array.isArray(data) ? data : []))
      .catch(() => setCars([]));
  }, [user]);

  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this car?")) return;

    fetch(`http://https://assign-b13-9-server-g6yqnhpe1-moumitaaaa18s-projects.vercel.app/cars/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => res.json())
      .then(() => {
        setCars(cars.filter((car) => car._id !== id));
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-3">My Added Cars</h2>

        <p className="text-center text-gray-500 mb-10">
          Manage your own listed cars
        </p>

        {cars.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow text-center">
            <h2 className="text-2xl font-bold">No Added Car Found</h2>
            <p className="text-gray-500 mt-2">
              You have not added any car yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <div key={car._id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <img
                  src={car.image || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900"}
                  alt={car.carModel}
                  className="w-full h-52 object-cover"
                />

                <div className="p-5">
                  <h2 className="text-2xl font-bold mb-2">{car.carModel}</h2>
                  <p>Type: {car.carType}</p>
                  <p>Price: ৳{car.dailyRentalPrice}/day</p>
                  <p>Seats: {car.seatCapacity || "N/A"}</p>
                  <p>Location: {car.location}</p>
                  <p>Status: {car.availability}</p>

                  <div className="flex gap-3 mt-5">
                    <Link to={`/update-car/${car._id}`} className="flex-1">
                      <button className="w-full bg-blue-500 text-white py-2 rounded-xl">
                        Update
                      </button>
                    </Link>

                    <button
                      onClick={() => handleDelete(car._id)}
                      className="flex-1 bg-red-500 text-white py-2 rounded-xl"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCars;