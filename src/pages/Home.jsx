import { useEffect, useState } from "react";
import { Link } from "react-router";
import CarCard from "../components/CarCard";

const Home = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("https://assign-b13-9-server.vercel.app/cars")
      .then((res) => res.json())
      .then((data) => setCars(data.slice(0, 6)))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="bg-gray-50">
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-red-900 text-white py-20 md:py-28 px-5 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-5">
          Rent Your Perfect Car
        </h1>

        <p className="max-w-2xl mx-auto text-gray-200 mb-8 text-sm md:text-base">
          Discover affordable, premium and luxury cars for your next journey.
          Fast booking, trusted service and comfortable rides across Bangladesh.
        </p>

        <Link to="/available-cars">
          <button className="bg-red-500 hover:bg-red-600 px-8 py-3 rounded-xl font-semibold">
            Explore Cars
          </button>
        </Link>
      </section>

      <section className="max-w-7xl mx-auto px-5 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          Available Cars
        </h2>

        <p className="text-center text-gray-500 mb-10">
          Choose from our premium collection of rental cars
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      </section>

      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
            How DriveFleet Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">
              <div className="text-5xl mb-5"></div>
              <h3 className="text-2xl font-bold mb-3">Choose Your Car</h3>
              <p className="text-gray-600 leading-7">
                Browse from premium sedans, SUVs and luxury cars easily from our
                collection.
              </p>
            </div>

            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-8 rounded-3xl shadow-2xl hover:scale-105 transition duration-300">
              <div className="text-5xl mb-5"></div>
              <h3 className="text-2xl font-bold mb-3">Book Instantly</h3>
              <p className="leading-7">
                Select your preferred booking options and reserve your car
                within seconds.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">
              <div className="text-5xl mb-5"></div>
              <h3 className="text-2xl font-bold mb-3">Enjoy Your Ride</h3>
              <p className="text-gray-600 leading-7">
                Pickup the car and enjoy a smooth, comfortable and safe journey
                anywhere in Bangladesh.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 text-white py-16 px-5 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Why Choose DriveFleet?
        </h2>

        <p className="max-w-2xl mx-auto text-gray-300">
          We provide reliable rental cars, affordable prices, easy booking and
          trusted service for customers across Bangladesh.
        </p>
      </section>
    </div>
  );
};

export default Home;