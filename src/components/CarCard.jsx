import { Link } from "react-router";

const CarCard = ({ car }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <img
        src={car.image}
        alt={car.carModel}
        className="w-full h-56 object-cover"
      />

      <div className="p-6">
        <h3 className="text-2xl font-bold mb-3">{car.carModel}</h3>

        <p>Type: {car.carType}</p>
        <p>Price: ৳{car.dailyRentalPrice}/day</p>
        <p>Seats: {car.seatCapacity}</p>
        <p>Location: {car.location}</p>
        <p>Status: {car.availability}</p>
        <p>Booking Count: {car.booking_count}</p>

        <Link to={`/cars/${car._id}`}>
          <button className="mt-5 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CarCard;