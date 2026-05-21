import { useEffect, useState } from "react";

const carImages = [
  "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800",
  "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800",
  "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800",
  "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
  "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
  "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800",
];

const getCarImage = (car, index) => {
  const img = car.image || car.imageUrl || car.photo;

  if (img && !img.includes("ibb.co") && !img.includes("imgbb.com")) {
    return img;
  }

  return carImages[index % carImages.length];
};

const AvailableCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/cars")
      .then((res) => res.json())
      .then((data) => setCars(data.slice(0, 6)))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="px-10 py-16">
      <h2 className="text-4xl font-bold text-center mb-10">
        Available Cars
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car, index) => (
          <div key={car._id} className="border rounded-xl shadow p-4">
            <img
              src={getCarImage(car, index)}
              alt={car.carModel || "Car"}
              className="w-full h-48 object-cover rounded-xl"
            />

            <h3 className="text-2xl font-bold mt-4">{car.carModel}</h3>
            <p>Type: {car.carType}</p>
            <p>Price: ৳{car.dailyRentalPrice}/day</p>
            <p>Location: {car.location}</p>
            <p>Status: {car.availability}</p>

            <button className="bg-red-500 text-white px-4 py-2 rounded mt-4">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableCars;