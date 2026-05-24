import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const API = "http://localhost:5000";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setBookings([]);
      setLoading(false);
      return;
    }

    fetch(`${API}/bookings?email=${user.email}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setBookings(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setBookings([]);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-3">My Bookings</h2>
        <p className="text-center text-gray-500 mb-10">View all your booked cars</p>

        {bookings.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow text-center">
            <h2 className="text-2xl font-bold">No Booking Found</h2>
            <p className="text-gray-500 mt-2">You have not booked any car yet.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white p-6 rounded-2xl shadow">
                <h2 className="text-2xl font-bold">{booking.carModel}</h2>
                <p>Total Price: ৳{booking.totalPrice || booking.price}</p>
                <p>Booking Date: {booking.bookingDate}</p>
                <p>Driver Needed: {booking.driverNeeded}</p>
                <p>Note: {booking.specialNote || "No special note"}</p>
                <p className="text-green-600 font-semibold">
                  Status: {booking.status || "Confirmed"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;