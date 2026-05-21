import { useEffect, useState } from "react";

const fallbackImage =
  "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800";

function App() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/cars")
      .then((res) => res.json())
      .then((data) => setCars(data.slice(0, 6)))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <nav className="flex justify-between px-10 py-5 bg-black text-white">
        <h1 className="text-3xl font-bold text-red-500">DriveFleet</h1>
        <ul className="flex gap-6">
          <li>Home</li>
          <li>Available Cars</li>
          <li>Add Car</li>
          <li>My Cars</li>
          <li>Login</li>
        </ul>
      </nav>

      <section className="text-center mt-20 px-4">
        <h1 className="text-5xl md:text-6xl font-bold">
          Rent Your Perfect Car
        </h1>
        <p className="mt-5 text-gray-500">
          Find affordable and comfortable cars easily
        </p>
        <button className="bg-red-500 px-6 py-3 rounded text-white mt-6">
          Explore Cars
        </button>
      </section>

      <section className="px-10 py-16">
        <h2 className="text-4xl font-bold text-center mb-10">
          Available Cars
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <div key={car._id} className="border rounded-xl shadow p-4">
              <img
                src={car.image || car.imageUrl || car.photo || fallbackImage}
                onError={(e) => {
                  e.currentTarget.src = fallbackImage;
                }}
                alt={car.carModel || car.carName || "Car"}
                className="w-full h-48 object-cover rounded-xl"
              />

              <h3 className="text-2xl font-bold mt-4">
                {car.carModel || car.carName || "Car Name"}
              </h3>
              <p>Type: {car.carType || "Sedan"}</p>
              <p>Price: ৳{car.dailyRentalPrice || car.price || 0}/day</p>
              <p>Location: {car.location || car.pickupLocation || "N/A"}</p>
              <p>Status: {car.availability || "Available"}</p>

              <button className="bg-red-500 text-white px-4 py-2 rounded mt-4">
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-black text-white mt-20 py-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-3xl font-bold text-red-500">
              Drive<span className="text-white">Fleet</span>
            </h2>
            <p className="mt-4 text-gray-400">
              Rent affordable and premium cars easily across Bangladesh. Safe,
              fast and comfortable booking experience.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Home</li>
              <li>Available Cars</li>
              <li>Add Car</li>
              <li>My Added Cars</li>
              <li>My Bookings</li>
              <li>Login</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <p className="text-gray-400">📍 Sylhet, Bangladesh</p>
            <p className="text-gray-400">📧 drivefleet@gmail.com</p>
            <p className="text-gray-400">📞 +880123456789</p>

            <div className="mt-4 flex gap-4 text-2xl">
              <span>🌐</span>
              <span>📘</span>
              <span>𝕏</span>
              <span>💼</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-5 text-center text-gray-500">
          © 2026 DriveFleet. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;