import { Link } from "react-router";

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

const CarCard = ({ car }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <img
        src={car.image || getCarImage(car.carModel)}
        alt={car.carModel}
        className="w-full h-56 object-cover"
      />

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">{car.carModel}</h2>
        <p>Type: {car.carType}</p>
        <p>Price: ৳{car.dailyRentalPrice}/day</p>
        <p>Seats: {car.seatCapacity || "N/A"}</p>
        <p>Location: {car.location}</p>
        <p>Status: {car.availability}</p>
        <p>Booking Count: {car.booking_count || 0}</p>

        <Link to={`/cars/${car._id}`}>
          <button className="mt-5 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CarCard;