import { useEffect, useState } from "react";
import { useParams } from "react-router";

const getCarImage = (name = "") => {
  const car = name.toLowerCase();

  if (car.includes("toyota"))
    return "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800";
  if (car.includes("honda"))
    return "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800";
  if (car.includes("suzuki"))
    return "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800";
  if (car.includes("mercedes"))
    return "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800";
  if (car.includes("nissan"))
    return "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800";
  if (car.includes("mazda"))
    return "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800";

  return "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800";
};

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/cars/${id}`)
      .then((res) => res.json())
      .then((data) => setCar(data));
  }, [id]);

  const handleBooking = () => {
    const bookingInfo = {
      carId: car._id,
      carModel: car.carModel,
      totalPrice: car.dailyRentalPrice,
      bookingDate: new Date(),
      driverNeeded: "No",
      specialNote: "No special note",
    };

    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(bookingInfo),
    })
      .then((res) => res.json())
      .then(() => {
        setSuccess("Car booked successfully!");
        setCar({ ...car, booking_count: (car.booking_count || 0) + 1 });
      });
  };

  if (!car) return <p className="text-center mt-20 text-xl">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 py-16 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          <img
            src={getCarImage(car.carModel)}
            alt={car.carModel}
            className="w-full h-full min-h-[420px] object-cover"
          />

          <div className="p-10">
            <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold">
              {car.availability}
            </span>

            <h2 className="text-5xl font-bold mt-6 mb-5">{car.carModel}</h2>

            <div className="grid grid-cols-1 gap-4 text-lg">
              <p className="bg-gray-100 p-4 rounded-xl">🚗 Type: {car.carType}</p>
              <p className="bg-gray-100 p-4 rounded-xl">
                💰 Price: ৳{car.dailyRentalPrice}/day
              </p>
              <p className="bg-gray-100 p-4 rounded-xl">
                📍 Location: {car.location}
              </p>
              <p className="bg-gray-100 p-4 rounded-xl">
                📊 Booking Count: {car.booking_count || 0}
              </p>
            </div>

            <button
              onClick={handleBooking}
              className="w-full mt-8 bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 duration-300 text-white px-8 py-4 rounded-2xl text-lg font-semibold"
            >
              Book Now
            </button>

            {success && (
              <p className="mt-5 bg-green-100 text-green-700 p-4 rounded-xl text-center font-semibold">
                {success}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;