import { useEffect, useState } from "react";
import CarCard from "../components/CarCard";

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All Types");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:5000/cars?search=${search}&type=${type}`)
      .then((res) => res.json())
      .then((data) => {
        setCars(data.slice(0, 6));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [search, type]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-3">Available Cars</h2>

        <p className="text-center text-gray-500 mb-10">
          Search and filter cars based on your need
        </p>

        <div className="grid md:grid-cols-2 gap-5 mb-10">
          <input
            type="text"
            placeholder="Search by car model..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-4 rounded-xl outline-none"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border p-4 rounded-xl outline-none"
          >
            <option>All Types</option>
            <option>Sedan</option>
            <option>SUV</option>
            <option>Hatchback</option>
            <option>Luxury</option>
          </select>
        </div>

        <p className="text-center font-semibold mb-10">
          Total Cars Found: {cars.length}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailableCars;