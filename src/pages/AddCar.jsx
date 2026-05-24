import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const AddCar = () => {
  const { user } = useContext(AuthContext);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleAddCar = (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    const form = e.target;

    const newCar = {
      carModel: form.carModel.value,
      dailyRentalPrice: parseInt(form.dailyRentalPrice.value),
      carType: form.carType.value,
      image: form.image.value,
      seatCapacity: parseInt(form.seatCapacity.value),
      location: form.location.value,
      description: form.description.value,
      availability: form.availability.value,
      userEmail: user?.email,
      booking_count: 0,
      isMyAdded: true,
    };

    
    fetch (`${import.meta.env.VITE_API_URL}/cars`,{
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newCar),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setSuccess("Car added successfully!");
          form.reset();
        } else {
          setError("Failed to add car");
        }
      })
      .catch(() => setError("Something went wrong"));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-5">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-4xl font-bold text-center mb-8">Add New Car</h2>

        <p className="text-center text-gray-500 mb-6">
          For Image URL, copy any car image link from Google/Unsplash/Imgbb and paste it here.
        </p>

        {success && (
          <p className="bg-green-100 text-green-700 p-3 rounded-xl mb-5 text-center font-semibold">
            {success}
          </p>
        )}

        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded-xl mb-5 text-center font-semibold">
            {error}
          </p>
        )}

        <form onSubmit={handleAddCar} className="grid md:grid-cols-2 gap-5">
          <input name="carModel" placeholder="Car Name" className="border p-3 rounded-xl" required />

          <input name="dailyRentalPrice" type="number" placeholder="Daily Rent Price" className="border p-3 rounded-xl" required />

          <select name="carType" className="border p-3 rounded-xl" required>
            <option value="">Select Car Type</option>
            <option>SUV</option>
            <option>Sedan</option>
            <option>Hatchback</option>
            <option>Luxury</option>
          </select>

          <select
  name="image"
  className="border p-3 rounded-xl"
  required
>
  <option value="">Select Car Image</option>

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
          <input name="seatCapacity" type="number" placeholder="Seat Capacity" className="border p-3 rounded-xl" required />

          <select name="location" className="border p-3 rounded-xl" required>
            <option value="">Select Pickup Location</option>
            <option>Dhaka</option>
            <option>Sylhet</option>
            <option>Rajshahi</option>
            <option>Khulna</option>
            <option>Chittagong</option>
            <option>Barishal</option>
            <option>Rangpur</option>
          </select>

          <select name="availability" className="border p-3 rounded-xl" required>
            <option>Available</option>
            <option>Unavailable</option>
          </select>

          <textarea
            name="description"
            placeholder="Description"
            className="border p-3 rounded-xl md:col-span-2"
            required
          ></textarea>

          <button className="md:col-span-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold">
            Add Car
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCar;