import { useEffect, useState } from "react";
import { useParams } from "react-router";

const carImages = {
  toyota: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800",
  honda: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800",
  suzuki: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800",
  mercedes: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
  nissan: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800",
  mazda: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800",
};

const getCarImage = (car) => {
  const name = (car?.carModel || "").toLowerCase();

  if (name.includes("toyota")) return carImages.toyota;
  if (name.includes("honda")) return carImages.honda;
  if (name.includes("suzuki")) return carImages.suzuki;
  if (name.includes("mercedes")) return carImages.mercedes;
  if (name.includes("nissan")) return carImages.nissan;
  if (name.includes("mazda")) return carImages.mazda;

  return "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800";
};

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/cars/${id}`)
      .then((res) => res.json())
      .then((data) => setCar(data))
      .catch((error) => console.log(error));
  }, [id]);

  if (!car) {
    return <p className="text-center mt-20 text-xl">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <img
          src={getCarImage(car)}
          alt={car.carModel}
          className="w-full h-[350px] object-cover rounded-2xl shadow"
        />

        <div>
          <h1 className="text-4xl font-bold mb-4">{car.carModel}</h1>

          <p className="text-lg mb-2">Type: {car.carType}</p>
          <p className="text-lg mb-2">Price: ৳{car.dailyRentalPrice}/day</p>
          <p className="text-lg mb-2">Location: {car.location}</p>
          <p className="text-lg mb-2">Status: {car.availability}</p>
          <p className="text-lg mb-2">Booking Count: {car.booking_count || 0}</p>

          <p className="text-gray-600 mt-5">
            {car.description ||
              "This car is comfortable, reliable and perfect for daily rental service."}
          </p>

          <button className="bg-red-500 text-white px-6 py-3 rounded mt-6">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;