import { useEffect, useState } from "react";

const fallbackImage =
  "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800";

const Home = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/cars")
      .then((res) => res.json())
      .then((data) => setCars(data.slice(0, 6)));
  }, []);

  return (
    <div>
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
            <div
              key={car._id}
              className="border rounded-xl shadow p-4"
            >
              <img
                src={
                  car.image ||
                  car.imageUrl ||
                  car.photo ||
                  fallbackImage
                }
                onError={(e) => {
                  e.currentTarget.src = fallbackImage;
                }}
                alt={car.carModel || "Car"}
                className="w-full h-48 object-cover rounded-xl"
              />

              <h3 className="text-2xl font-bold mt-4">
                {car.carModel}
              </h3>

              <p>Type: {car.carType}</p>

              <p>
                Price: ৳{car.dailyRentalPrice}/day
              </p>

              <p>Location: {car.location}</p>

              <p>Status: {car.availability}</p>

              <button className="bg-red-500 text-white px-4 py-2 rounded mt-4">
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;