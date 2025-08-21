import { useEffect, useState } from 'react';
import axios from 'axios';

const PetListings = () => {
  const [user, setUser] = useState(null);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [requestStatuses, setRequestStatuses] = useState({}); // Track request status per pet

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data);
          fetchPets(token);
          fetchAdoptionRequests(token); // Fetch existing adoption requests
        })
        .catch((err) => {
          console.error('Auth error:', err);
          localStorage.removeItem('token');
          setUser(null);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch all available pets
  const fetchPets = (token) => {
    setLoading(true);
    axios
      .get('http://localhost:5000/api/pets', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const availablePets = res.data.filter((pet) => pet.available);
        setPets(availablePets);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError('Failed to fetch pets.');
        setLoading(false);
      });
  };

  // Fetch adopter's existing adoption requests from backend
  const fetchAdoptionRequests = async (token) => {
    try {
      const res = await axios.get('http://localhost:5000/api/my-adoptions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const statuses = res.data.reduce((acc, req) => {
        acc[req.petId._id] = req.status; // store petId => status
        return acc;
      }, {});
      setRequestStatuses(statuses);
    } catch (err) {
      console.error('Fetch requests error:', err);
      setError('Failed to fetch adoption requests.');
    }
  };

  const handleAdopt = async (petId) => {
    if (!user) return setError('Please log in to request an adoption.');
    const token = localStorage.getItem('token');

    try {
      await axios.post(
        `http://localhost:5000/api/adoptions/${petId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRequestStatuses((prev) => ({ ...prev, [petId]: 'Pending' }));
      setError('Adoption request submitted successfully!');
    } catch (err) {
      console.error('Adopt error:', err.response || err.message);
      setError('Failed to request adoption.');
    }
  };

  const handleCancel = async (petId) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5000/api/my-adoptions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const request = res.data.find((req) => req.petId._id === petId);
      if (!request) return;

      await axios.delete(`http://localhost:5000/api/adoptions/${request._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setRequestStatuses((prev) => {
        const newStatuses = { ...prev };
        delete newStatuses[petId];
        return newStatuses;
      });
      setError('Adoption request canceled successfully!');
    } catch (err) {
      console.error('Cancel error:', err.response || err.message);
      setError('You cannot cancel this adoption request.');
    }
  };

  if (loading)
    return (
      <div className="text-center mt-10">
        <p>Loading...</p>
      </div>
    );
  if (!user)
    return (
      <div className="text-center mt-10">
        <p>Please log in to view pet listings.</p>
      </div>
    );
  if (user.role !== 'Adopter')
    return (
      <div className="text-center mt-10">
        <p>Access denied.</p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto mt-10 px-6">
      <h2 className="text-3xl font-bold mb-6 text-center">🐾 Available Pets</h2>
      {error && (
        <p
          className={`text-center mb-6 font-medium ${
            error.includes('successfully') ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {error}
        </p>
      )}

      {pets.length === 0 ? (
        <p className="text-center text-gray-600">No available pets found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div
              key={pet._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2"
            >
              {pet.image && (
                <img
                  src={pet.image.startsWith('http') ? pet.image : `http://localhost:5000${pet.image}`}
                  alt={pet.name}
                  className="w-full h-64 object-cover"
                  onError={(e) => (e.target.src = `https://via.placeholder.com/300x200?text=${pet.name}`)}
                />
              )}

              <div className="p-4">
                <h3 className="text-xl font-bold">{pet.name}</h3>
                <p>
                  <strong>Breed:</strong> {pet.breed || 'Not specified'}
                </p>
                <p>
                  <strong>Age:</strong> {pet.age || 'Not specified'}
                </p>
                <p>
                  <strong>Type:</strong> {pet.type || 'Not specified'}
                </p>
                <p className="mb-3">
                  <strong>Description:</strong> {pet.description || 'No description'}
                </p>

                {requestStatuses[pet._id] ? (
                  <div className="space-y-2">
                    <div
                      className={`px-4 py-2 rounded text-center font-semibold ${
                        requestStatuses[pet._id] === 'Pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : requestStatuses[pet._id] === 'Accepted'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {requestStatuses[pet._id]} Request
                    </div>
                    <button
                      onClick={() => handleCancel(pet._id)}
                      className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                    >
                      Cancel Request
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAdopt(pet._id)}
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                    disabled={!pet.available}
                  >
                    Request Adoption
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PetListings;
