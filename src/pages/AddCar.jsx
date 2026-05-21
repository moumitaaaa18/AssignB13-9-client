import { useState } from "react";

const AddCar = () => {
  const [success, setSuccess] = useState("");

  const handleAddCar = (e) => {
    e.preventDefault();
    const form = e.target;

    const newCar = {
      carModel: form.carModel.value,
      carType: form.carType.value,
      dailyRentalPrice: Number(form.dailyRentalPrice.value),
      location: form.location.value,
      availability: form.availability.value,
      booking_count: 0,
    };

    fetch("http://localhost:5000/cars", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newCar),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setSuccess("Car added successfully!");
          form.reset();
        }
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-red-500 to-purple-600 text-white text-center py-10 px-4">
          <h2 className="text-4xl font-bold">Add New Car</h2>
          <p className="mt-3">Fill up the form to add a new rental car</p>
        </div>

        <form onSubmit={handleAddCar} className="p-8 md:p-10">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold">Car Model</label>
              <input
                list="carModels"
                name="carModel"
                className="w-full border mt-2 p-3 rounded-xl outline-none focus:border-red-500"
                required
              />
              <datalist id="carModels">
                <option value="Toyota Corolla" />
                <option value="Honda Civic" />
                <option value="Suzuki Swift" />
                <option value="Nissan X-Trail" />
                <option value="Mazda CX-5" />
                <option value="Mercedes C-Class" />
                <option value="Audi A4" />
              </datalist>
            </div>

            <div>
              <label className="font-semibold">Car Type</label>
              <select
                name="carType"
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
                list="rentalPrices"
                type="number"
                name="dailyRentalPrice"
                className="w-full border mt-2 p-3 rounded-xl outline-none focus:border-red-500"
                required
              />
              <datalist id="rentalPrices">
                <option value="3000" />
                <option value="4000" />
                <option value="5000" />
                <option value="6500" />
                <option value="7200" />
                <option value="10000" />
                <option value="12000" />
              </datalist>
            </div>

            <div>
              <label className="font-semibold">Location</label>
              <select
                name="location"
                className="w-full border mt-2 p-3 rounded-xl outline-none focus:border-red-500"
                required
              >
                <option value="">Select Location</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Mymensingh">Mymensingh</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="font-semibold">Availability Status</label>
              <select
                name="availability"
                className="w-full border mt-2 p-3 rounded-xl outline-none focus:border-red-500"
                required
              >
                <option value="">Select Availability Status</option>
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 duration-300 text-white py-3 rounded-xl mt-8 text-lg font-semibold">
            Add Car
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

export default AddCar;