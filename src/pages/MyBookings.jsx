import { useEffect, useState } from "react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-6 md:px-10">
      <h2 className="text-4xl font-bold text-center mb-4">My Bookings</h2>

      <p className="text-center text-gray-500 mb-10">
        View all your booked cars
      </p>

      {bookings.length === 0 ? (
        <p className="text-center text-xl text-gray-500">
          No bookings found.
        </p>
      ) : (
        <div className="max-w-5xl mx-auto grid gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div>
                <h3 className="text-2xl font-bold">{booking.carModel}</h3>
                <p className="text-gray-600">
                  Total Price: ৳{booking.totalPrice || booking.dailyRentalPrice}
                </p>
                <p className="text-gray-600">
                  Booking Date: {booking.bookingDate}
                </p>
                <p className="text-gray-600">
                  Driver Needed: {booking.driverNeeded || "No"}
                </p>
                <p className="text-gray-600">
                  Note: {booking.specialNote || "No special note"}
                </p>
              </div>

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                Confirmed
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;