const Footer = () => {
  return (
    <footer className="bg-black text-white mt-20 py-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-3xl font-bold text-red-500">
            Drive<span className="text-white">Fleet</span>
          </h2>
          <p className="mt-4 text-gray-400">
            Rent affordable and premium cars easily across Bangladesh.
            Safe, fast and comfortable booking experience.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Home</li>
            <li>Available Cars</li>
            <li>Add Car</li>
            <li>My Added Cars</li>
            <li>My Bookings</li>
            <li>Login</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <p className="text-gray-400">📍 Sylhet, Bangladesh</p>
          <p className="text-gray-400">📧 drivefleet@gmail.com</p>
          <p className="text-gray-400">📞 +880123456789</p>

          <div className="mt-4 flex gap-4 text-2xl">
            <span>🌐</span>
            <span>📘</span>
            <span>𝕏</span>
            <span>💼</span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-5 text-center text-gray-500">
        © 2026 DriveFleet. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;