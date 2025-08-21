import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section - Full width and height */}
      <section className="bg-gradient-to-br from-orange-500 via-orange-600 to-amber-500 text-white min-f-screen flex items-center">
        <div className="container mx-auto text-center px-6 py-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Welcome to Pet Adoption Portal 🐾
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed max-w-3xl mx-auto">
              Find your perfect companion and give a pet a loving home. Join thousands of families who have found their furry best friends through our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate("/login")}
                className="bg-white text-orange-600 px-8 py-4 rounded-xl shadow-lg hover:bg-orange-50 font-semibold transition-all duration-300 transform hover:scale-105 text-lg cursor-pointer"
              >
                View Available Pets
              </button>
              <button
                onClick={() => navigate("/login")}
                className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-orange-600 font-semibold transition-all duration-300 transform hover:scale-105 text-lg cursor-pointer"
              >
                Learn More →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Full width */}
      <section className="bg-white py-5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make pet adoption simple, safe, and rewarding for both pets and families.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-orange-100">
              <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🐶</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Adopt Pets</h3>
              <p className="text-gray-600 leading-relaxed">
                Browse our extensive list of pets and find your perfect furry friend. Each pet profile includes detailed information and photos.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-orange-100">
              <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📅</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Easy Process</h3>
              <p className="text-gray-600 leading-relaxed">
                Our simple and transparent adoption process makes it easy for everyone to find their perfect companion with full support.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-orange-100">
              <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">❤️</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Save Lives</h3>
              <p className="text-gray-600 leading-relaxed">
                Give homeless pets a second chance at life and happiness. Every adoption saves a life and makes room for another rescue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Full width */}
      <section className="bg-gradient-to-r from-orange-500 to-amber-500 py-20 text-center">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              Ready to find your new best friend?
            </h2>
            <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
              Join our community today and start your journey to finding the perfect pet companion.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="inline-block bg-white text-orange-600 px-10 py-4 rounded-xl shadow-lg hover:bg-orange-50 font-semibold transition-all duration-300 transform hover:scale-105 text-lg cursor-pointer"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
