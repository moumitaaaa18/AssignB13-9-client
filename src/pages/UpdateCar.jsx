import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const UpdateCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/cars/${id}`)
      .then((res) => res.json())
      .then((data) => setCar(data));
  }, [id]);

  const handleUpdateCar = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedCar = {
      carModel: form.carModel.value,
      carType: form.carType.value,
      dailyRentalPrice: Number(form.dailyRentalPrice.value),
      location: form.location.value,
      availability: form.availability.value,
    };

    fetch(`http://localhost:5000/cars/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updatedCar),
    })
      .then((res) => res.json())
      .then(() => {
        setSuccess("Car updated successfully!");
        setTimeout(() => navigate("/my-cars"), 800);
      });
  };

  if (!car) {
    return <p className="text-center mt-20 text-xl">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-red-500 text-white text-center py-10 px-4">
          <h2 className="text-4xl font-bold">Update Car</h2>
          <p className="mt-3">Edit your listed car information</p>
        </div>

        <form onSubmit={handleUpdateCar} className="p-8 md:p-10">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold">Car Model</label>
              <input
                name="carModel"
                defaultValue={car.carModel}
                className="w-full border mt-2 p-3 rounded-xl outline-none focus:border-red-500"
                required
              />
            </div>

            <div>
              <label className="font-semibold">Car Type</label>
              <select
                name="carType"
                defaultValue={car.carType}
                className="w-full border mt-2 p-3 rounded-xl outline-none focus:border-red-500"
                required
              >
                <option value="">Select Type</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Luxury">Luxury</option>
                <option value="Sports">Sports</option>
                <option value="Hatchback">Hatchback</option>
              </select>
            </div>

            <div>
              <label className="font-semibold">Daily Rental Price</label>
              <input
                type="number"
                name="dailyRentalPrice"
                defaultValue={car.dailyRentalPrice}
                className="w-full border mt-2 p-3 rounded-xl outline-none focus:border-red-500"
                required
              />
            </div>

            <div>
              <label className="font-semibold">Location</label>
              <select
                name="location"
                defaultValue={car.location}
                className="w-full border mt-2 p-3 rounded-xl outline-none focus:border-red-500"
                required
              >
                <option value="">Select Location</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Mymensingh">Mymensingh</option>
                <option value="Khulna">Khulna</option>
                <option value="Barishal">Barishal</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="font-semibold">Availability Status</label>
              <select
                name="availability"
                defaultValue={car.availability}
                className="w-full border mt-2 p-3 rounded-xl outline-none focus:border-red-500"
                required
              >
                <option value="">Select Availability Status</option>
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-blue-600 to-red-500 hover:from-blue-700 hover:to-red-600 duration-300 text-white py-3 rounded-xl mt-8 text-lg font-semibold">
            Update Car
          </button>

          {success && (
            <p className="text-green-600 text-center mt-5 font-semibold">
              {success}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default UpdateCar;