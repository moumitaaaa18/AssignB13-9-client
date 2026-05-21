import { useEffect, useState } from "react";

const carImages = {
  toyota: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800",
  honda: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800",
  suzuki: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800",
  mercedes: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
  nissan: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800",
  mazda: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800",
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

const MyCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/my-cars")
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this car?"
    );

    if (confirmDelete) {
      fetch(`http://localhost:5000/cars/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          const remainingCars = cars.filter(
            (car) => car._id !== id
          );

          setCars(remainingCars);
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-6 md:px-10">
      <h2 className="text-4xl font-bold text-center mb-4">
        My Added Cars
      </h2>

      <p className="text-center text-gray-500 mb-12">
        Manage your added rental cars
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car) => (
          <div
            key={car._id}
            className="bg-white rounded-3xl shadow-lg overflow-hidden"
          >
            <img
              src={getCarImage(car)}
              alt={car.carModel}
              className="w-full h-52 object-cover"
            />

            <div className="p-5">
              <h3 className="text-2xl font-bold">
                {car.carModel}
              </h3>

              <div className="mt-3 space-y-1 text-gray-600">
                <p>Type: {car.carType}</p>
                <p>
                  Price: ৳{car.dailyRentalPrice}/day
                </p>
                <p>Location: {car.location}</p>
                <p>Status: {car.availability}</p>
              </div>

              <div className="flex gap-3 mt-6">
                <button className="flex-1 bg-blue-500 hover:bg-blue-600 duration-300 text-white py-2 rounded-xl">
                  Update
                </button>

                <button
                  onClick={() => handleDelete(car._id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 duration-300 text-white py-2 rounded-xl"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCars;