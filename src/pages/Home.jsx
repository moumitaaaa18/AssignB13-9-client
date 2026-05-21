import { useEffect, useState } from "react";
import { Link } from "react-router";

const carImages = {
  toyota:
    "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800",

  honda:
    "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800",

  suzuki:
    "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800",

  mercedes:
    "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",

  nissan:
    "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800",

  mazda:
    "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800",
};

const getCarImage = (car) => {
  const name = (car.carModel || "").toLowerCase();

  if (name.includes("toyota")) return carImages.toyota;
  if (name.includes("honda")) return carImages.honda;
  if (name.includes("suzuki")) return carImages.suzuki;
  if (name.includes("mercedes")) return carImages.mercedes;
  if (name.includes("nissan")) return carImages.nissan;
  if (name.includes("mazda")) return carImages.mazda;

  return "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800";
};

const Home = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/cars")
      .then((res) => res.json())
      .then((data) => setCars(data.slice(0, 6)))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {/* Banner */}
      <section className="text-center mt-20 px-4">
        <h1 className="text-5xl md:text-6xl font-bold">
          Rent Your Perfect Car
        </h1>

        <p className="mt-5 text-gray-500 max-w-2xl mx-auto">
          Discover affordable, premium and luxury cars for your next journey.
          Fast booking, trusted service and comfortable rides across Bangladesh.
        </p>

        <Link to="/available-cars">
          <button className="bg-red-500 hover:bg-red-600 duration-300 px-6 py-3 rounded text-white mt-6">
            Explore Cars
          </button>
        </Link>
      </section>

      {/* Available Cars */}
      <section className="px-6 md:px-10 py-16">
        <h2 className="text-4xl font-bold text-center mb-3">
          Available Cars
        </h2>

        <p className="text-center text-gray-500 mb-10">
          Choose from our premium collection of rental cars
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <div
              key={car._id}
              className="border rounded-2xl shadow hover:shadow-xl duration-300 p-4"
            >
              <img
                src={getCarImage(car)}
                alt={car.carModel || "Car"}
                className="w-full h-48 object-cover rounded-xl"
              />

              <h3 className="text-2xl font-bold mt-4">{car.carModel}</h3>

              <div className="mt-3 space-y-1 text-gray-600">
                <p>Type: {car.carType}</p>
                <p>Price: ৳{car.dailyRentalPrice}/day</p>
                <p>Location: {car.location}</p>
                <p>Status: {car.availability}</p>
              </div>

              <Link to={`/cars/${car._id}`}>
                <button className="bg-red-500 hover:bg-red-600 duration-300 text-white px-4 py-2 rounded mt-5">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Extra Static Section 1 */}
      <section className="bg-black text-white py-20 px-6 md:px-10">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose DriveFleet?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-900 p-8 rounded-2xl text-center">
            <h3 className="text-2xl font-bold mb-4 text-red-500">
              Affordable Pricing
            </h3>

            <p className="text-gray-400">
              Get the best rental prices without compromising comfort and
              quality.
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-2xl text-center">
            <h3 className="text-2xl font-bold mb-4 text-red-500">
              Trusted Cars
            </h3>

            <p className="text-gray-400">
              All vehicles are verified and maintained regularly for safety.
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-2xl text-center">
            <h3 className="text-2xl font-bold mb-4 text-red-500">
              Fast Booking
            </h3>

            <p className="text-gray-400">
              Book your desired car quickly with an easy and smooth process.
            </p>
          </div>
        </div>
      </section>

      {/* Extra Static Section 2 */}
      <section className="py-20 px-6 md:px-10">
        <h2 className="text-4xl font-bold text-center mb-12">
          How DriveFleet Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border rounded-2xl p-8 text-center shadow">
            <h3 className="text-3xl font-bold text-red-500 mb-4">01</h3>

            <h4 className="text-2xl font-semibold mb-3">
              Choose Your Car
            </h4>

            <p className="text-gray-500">
              Browse and select the perfect car based on your needs.
            </p>
          </div>

          <div className="border rounded-2xl p-8 text-center shadow">
            <h3 className="text-3xl font-bold text-red-500 mb-4">02</h3>

            <h4 className="text-2xl font-semibold mb-3">
              Book Instantly
            </h4>

            <p className="text-gray-500">
              Confirm your booking with a simple and quick booking process.
            </p>
          </div>

          <div className="border rounded-2xl p-8 text-center shadow">
            <h3 className="text-3xl font-bold text-red-500 mb-4">03</h3>

            <h4 className="text-2xl font-semibold mb-3">
              Enjoy Your Ride
            </h4>

            <p className="text-gray-500">
              Pick up the car and enjoy a safe and comfortable journey.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;