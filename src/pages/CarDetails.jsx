import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const API ="https://assign-b13-9-server.vercel.app";
const CarDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/cars/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCar(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleBooking = (e) => {
    e.preventDefault();

    if (!user?.email) {
      alert("Please login first");
      return;
    }

    const form = e.target;

    const bookingData = {
      carId: car._id,
      carModel: car.carModel,
      image: car.image,
      price: car.dailyRentalPrice,
      totalPrice: car.dailyRentalPrice,
      location: car.location,
      bookingDate: new Date().toLocaleDateString(),
      userEmail: user.email,
      userName: user?.displayName || user.email,
      driverNeeded: form.driverNeeded.value,
      specialNote: form.specialNote.value,
      status: "Confirmed",
    };

    fetch(`${API}/bookings`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(bookingData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setSuccess("Booking Successful!");
          setCar({
            ...car,
            booking_count: (car.booking_count || 0) + 1,
          });
          form.reset();
        }
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-3xl font-bold">Car not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
        <img
          src={
            car.image ||
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900"
          }
          alt={car.carModel}
          className="w-full h-[350px] object-cover"
        />

        <div className="p-8">
          <h2 className="text-4xl font-bold mb-5">{car.carModel}</h2>

          <div className="grid md:grid-cols-2 gap-4 text-gray-700 mb-6">
            <p><span className="font-bold">Type:</span> {car.carType}</p>
            <p><span className="font-bold">Price:</span> ৳{car.dailyRentalPrice}/day</p>
            <p><span className="font-bold">Seats:</span> {car.seatCapacity || "N/A"}</p>
            <p><span className="font-bold">Location:</span> {car.location}</p>
            <p><span className="font-bold">Availability:</span> {car.availability}</p>
            <p><span className="font-bold">Booking Count:</span> {car.booking_count || 0}</p>
          </div>

          <p className="text-gray-600 mb-8">
            {car.description || "No description available."}
          </p>

          <div className="bg-gray-50 p-6 rounded-2xl border">
            <h3 className="text-2xl font-bold mb-5">Book This Car</h3>

            {success && (
              <p className="bg-green-100 text-green-700 p-3 rounded-xl mb-4">
                {success}
              </p>
            )}

            <form onSubmit={handleBooking} className="space-y-5">
              <select
                name="driverNeeded"
                required
                className="w-full border p-3 rounded-xl"
              >
                <option value="">Driver Needed?</option>
                <option>Yes</option>
                <option>No</option>
              </select>

              <textarea
                name="specialNote"
                placeholder="Special Note"
                className="w-full border p-3 rounded-xl h-28"
              ></textarea>

              <button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold">
                Book Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;