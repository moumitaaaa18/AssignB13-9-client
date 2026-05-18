function App() {
  return (
    <div>

      {/* Navbar */}
      <nav className="flex justify-between px-10 py-5 bg-black text-white">
        <h1 className="text-3xl font-bold text-red-500">
          DriveFleet
        </h1>

        <ul className="flex gap-6">
          <li>Home</li>
          <li>Available Cars</li>
          <li>Add Car</li>
          <li>My Cars</li>
          <li>Login</li>
        </ul>
      </nav>


      {/* Hero Section */}
      <div className="text-center mt-20">
        <h1 className="text-6xl font-bold">
          Rent Your Perfect Car
        </h1>

        <p className="mt-5 text-gray-500">
          Find affordable and comfortable cars easily
        </p>

        <button className="bg-red-500 px-6 py-3 rounded text-white mt-6">
          Explore Cars
        </button>
      </div>

    </div>
  )
}

export default App;