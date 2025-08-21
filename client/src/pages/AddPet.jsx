import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddPet = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    age: "",
    type: "Dog",
    description: "",
    available: true,
    image: null,
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        });
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (file && !allowedTypes.includes(file.type)) {
        setError("Only JPEG, JPG, and PNG images are allowed!");
        setFormData({ ...formData, image: null });
        return;
      }
      setError("");
      setFormData({ ...formData, image: file });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || user.role !== "Shelter") {
      setError("Access denied. Only Shelters can add pets.");
      return;
    }
    if (!formData.type || !["Dog", "Cat", "Other"].includes(formData.type)) {
      setError("Please select a valid pet type.");
      return;
    }

    setIsSubmitting(true);

    const token = localStorage.getItem("token");
    const data = new FormData();
    data.append("name", formData.name);
    data.append("breed", formData.breed);
    data.append("age", formData.age);
    data.append("type", formData.type);
    data.append("description", formData.description);
    data.append("available", formData.available);
    if (formData.image) data.append("image", formData.image);

    try {
      await axios.post("http://localhost:5000/api/pets", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setIsSubmitting(false);
      setError("");
      navigate("/view-pets"); // ✅ Redirect to view pets after success
    } catch (err) {
      console.error("POST error:", err.response ? err.response.data : err.message);
      setIsSubmitting(false);
      setError("Failed to add pet. Check console for details.");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Authentication Required
          </h2>
          <p className="text-gray-600 text-center">Please log in to continue.</p>
        </div>
      </div>
    );
  }

  if (user.role !== "Shelter") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
          <p className="text-gray-600">
            Only Shelters can add pets to the platform.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-orange-600 to-amber-500">
      {/* Header Section */}
      <div className="pt-20 pb-10">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Add New Pet 🐾
          </h1>
          <p className="text-xl text-white opacity-90 max-w-2xl mx-auto">
            Help a furry friend find their forever home by adding them to our
            adoption platform.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-8 md:p-12">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-center">
                    <span className="text-red-500 text-xl mr-3">❌</span>
                    <p className="text-red-700 font-medium">{error}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Pet Name */}
                  <div className="space-y-2">
                    <label className="block text-gray-800 font-semibold text-lg">
                      Pet Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-0 transition-colors text-gray-800 text-lg"
                      placeholder="Enter pet's name"
                      required
                    />
                  </div>

                  {/* Breed */}
                  <div className="space-y-2">
                    <label className="block text-gray-800 font-semibold text-lg">
                      Breed
                    </label>
                    <input
                      type="text"
                      name="breed"
                      value={formData.breed}
                      onChange={handleChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-0 transition-colors text-gray-800 text-lg"
                      placeholder="Enter breed"
                      required
                    />
                  </div>

                  {/* Age */}
                  <div className="space-y-2">
                    <label className="block text-gray-800 font-semibold text-lg">
                      Age (years)
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-0 transition-colors text-gray-800 text-lg"
                      placeholder="Enter age"
                      min="0"
                      max="30"
                      required
                    />
                  </div>

                  {/* Pet Type */}
                  <div className="space-y-2">
                    <label className="block text-gray-800 font-semibold text-lg">
                      Pet Type
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-0 transition-colors text-gray-800 text-lg"
                      required
                    >
                      <option value="Dog">🐶 Dog</option>
                      <option value="Cat">🐱 Cat</option>
                      <option value="Other">🐾 Other</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="block text-gray-800 font-semibold text-lg">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-0 transition-colors text-gray-800 text-lg resize-none"
                    placeholder="Tell us about this pet's personality, habits, and what makes them special..."
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Available Status */}
                  <div className="space-y-2">
                    <label className="block text-gray-800 font-semibold text-lg">
                      Availability Status
                    </label>
                    <div className="flex items-center p-4 border-2 border-gray-200 rounded-xl">
                      <input
                        type="checkbox"
                        name="available"
                        id="available"
                        checked={formData.available}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            available: e.target.checked,
                          })
                        }
                        className="w-5 h-5 text-orange-500 border-2 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                      />
                      <label
                        htmlFor="available"
                        className="ml-3 text-gray-800 font-medium text-lg"
                      >
                        Available for adoption
                      </label>
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-2">
                    <label className="block text-gray-800 font-semibold text-lg">
                      Pet Photo
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        accept=".jpg,.jpeg,.png"
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-0 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      Only JPEG, JPG, and PNG files are allowed (max 5MB)
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                      isSubmitting
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:shadow-lg"
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Adding Pet...
                      </span>
                    ) : (
                      "Add Pet to Platform"
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/view-pets")} // ✅ Navigate to view pets
                    className="flex-1 py-4 px-8 border-2 border-orange-500 text-orange-600 rounded-xl font-semibold text-lg hover:bg-orange-50 transition-all duration-300 transform hover:scale-105"
                  >
                    View All Pets
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPet;
