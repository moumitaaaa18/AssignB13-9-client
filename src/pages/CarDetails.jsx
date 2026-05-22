import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const getCarImage = (name = "") => {
  const car = name.toLowerCase();

  if (car.includes("toyota"))
    return "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=900";

  if (car.includes("honda"))
    return "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=900";

  if (car.includes("suzuki"))
    return "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=900";

  if (car.includes("mercedes"))
    return "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=900";

  if (car.includes("nissan"))
    return "https://images.unsplash.com/photo-1542362567-b07e54358753?w=900";

  if (car.includes("mazda"))
    return "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=900";

  return "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900";
};

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const [car, setCar] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/cars/${id}`)
      .then((res) => res.json())
      .then((data) => setCar(data));
  }, [id]);

  const handleBooking = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const bookingInfo = {
      carId: car._id,
      carModel: car.carModel,
      carType: car.carType,
      dailyRentalPrice: car.dailyRentalPrice,
      location: car.location,
      bookingDate: new Date().toLocaleDateString(),
      status: "Confirmed",
      userEmail: user.email,
    };

    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bookingInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setMessage("Booking confirmed successfully!");

          setCar({
            ...car,
            booking_count: (car.booking_count || 0) + 1,
          });
        }
      });
  };

  if (!car) {
    return (
      <p className="text-center mt-20 text-2xl font-semibold">
        Loading...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-purple-50 px-6 py-16">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">

        <div className="grid md:grid-cols-2">

          <img
            src={getCarImage(car.carModel)}
            alt={car.carModel}
            className="w-full h-[450px] object-cover"
          />

          <div className="p-10">

            <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
              {car.availability}
            </span>

            <h1 className="text-5xl font-bold mt-6 mb-4">
              {car.carModel}
            </h1>

            <p className="text-gray-500 mb-8 leading-7">
              Premium quality rental car with modern features,
              comfortable driving experience and trusted service.
            </p>

            <div className="space-y-4 text-lg">

              <div className="bg-red-50 p-4 rounded-xl">
                 <span className="font-bold">Type:</span>{" "}
                {car.carType}
              </div>

              <div className="bg-purple-50 p-4 rounded-xl">
                 <span className="font-bold">Price:</span> ৳
                {car.dailyRentalPrice}/day
              </div>

              <div className="bg-blue-50 p-4 rounded-xl">
                 <span className="font-bold">Location:</span>{" "}
                {car.location}
              </div>

              <div className="bg-yellow-50 p-4 rounded-xl">
                 <span className="font-bold">
                  Booking Count:
                </span>{" "}
                {car.booking_count || 0}
              </div>
            </div>

            <button
              onClick={handleBooking}
              className="w-full mt-8 bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 duration-300 text-white py-4 rounded-2xl text-lg font-bold shadow-lg"
            >
              Book Now
            </button>

            {message && (
              <p className="mt-5 text-center bg-green-100 text-green-700 p-4 rounded-xl font-semibold">
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;