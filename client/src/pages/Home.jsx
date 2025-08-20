import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Pet Adoption Portal 🐾
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Find your perfect companion and give a pet a loving home.
          </p>
          <Link
            to="/login"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow hover:bg-gray-200 font-semibold"
          >
            View Available Pets
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-16 px-6 grid md:grid-cols-3 gap-8 text-center">
        <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg">
          <h3 className="text-xl font-bold mb-3">🐶 Adopt Pets</h3>
          <p className="text-gray-600">
            Browse our list of pets and find your furry friend.
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg">
          <h3 className="text-xl font-bold mb-3">📅 Easy Process</h3>
          <p className="text-gray-600">
            Simple and transparent adoption process for everyone.
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg">
          <h3 className="text-xl font-bold mb-3">❤️ Save Lives</h3>
          <p className="text-gray-600">
            Give homeless pets a second chance at life and happiness.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-50 py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to find your new best friend?
        </h2>
        <Link
          to="/login"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 font-semibold"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default Home;
