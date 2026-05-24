import { useEffect, useState } from "react";
import { useParams } from "react-router";


const UpdateCar = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/cars/${id}`)
      .then((res) => res.json())
      .then((data) => setCar(data));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const form = e.target;

    const updatedCar = {
      dailyRentalPrice: parseInt(form.dailyRentalPrice.value),
      description: form.description.value,
      availability: form.availability.value,
      image: form.image.value,
      carType: form.carType.value,
      location: form.location.value,
    };

    fetch(`http://localhost:5000/cars/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(updatedCar),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0 || data.matchedCount > 0) {
          setSuccess("Car updated successfully!");
          setCar({ ...car, ...updatedCar });
        }
      });
  };

  if (!car) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-lg">
        <h2 className="text-4xl font-bold text-center mb-8">Update Car</h2>

        {success && (
          <p className="bg-green-100 text-green-700 p-3 rounded-xl mb-5 text-center font-semibold">
            {success}
          </p>
        )}

        <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            type="number"
            name="dailyRentalPrice"
            defaultValue={car.dailyRentalPrice}
            className="border p-3 rounded-xl"
            required
          />

          <select
            name="carType"
            defaultValue={car.carType}
            className="border p-3 rounded-xl"
            required
          >
            <option>Sedan</option>
            <option>SUV</option>
            <option>Hatchback</option>
            <option>Luxury</option>
          </select>

          <select
            name="image"
            defaultValue={car.image}
            className="border p-3 rounded-xl"
            required
          >
            <option value="https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=900">
              Toyota Corolla
            </option>
            <option value="https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=900">
              Honda Civic
            </option>
            <option value="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=900">
              Suzuki Swift
            </option>
            <option value="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=900">
              Mercedes C-Class
            </option>
            <option value="https://images.unsplash.com/photo-1542362567-b07e54358753?w=900">
              Nissan X-Trail
            </option>
            <option value="https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=900">
              Mazda CX-5
            </option>
          </select>

          <select
            name="location"
            defaultValue={car.location}
            className="border p-3 rounded-xl"
            required
          >
            <option>Dhaka</option>
            <option>Sylhet</option>
            <option>Rajshahi</option>
            <option>Khulna</option>
            <option>Chittagong</option>
            <option>Barishal</option>
            <option>Rangpur</option>
          </select>

          <select
            name="availability"
            defaultValue={car.availability}
            className="border p-3 rounded-xl"
            required
          >
            <option>Available</option>
            <option>Unavailable</option>
          </select>

          <textarea
            name="description"
            defaultValue={car.description}
            className="border p-3 rounded-xl md:col-span-2"
            required
          ></textarea>

          <button className="md:col-span-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold">
            Update Car
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCar;