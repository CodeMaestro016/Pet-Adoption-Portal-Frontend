import { useEffect, useState } from 'react';
import axios from 'axios';

const ViewPets = () => {
  const [user, setUser] = useState(null);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingPet, setEditingPet] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    breed: '',
    age: '',
    type: '',
    description: '',
    available: true,
    image: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data);
          fetchPets(res.data._id, token);
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

  const fetchPets = (shelterId, token) => {
    setLoading(true);
    axios
      .get('http://localhost:5000/api/pets', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const userPets = res.data.filter(
          (pet) => pet.shelterId && pet.shelterId._id === shelterId
        );
        setPets(userPets);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError('Failed to fetch pets. Check console for details.');
        setLoading(false);
      });
  };

  const handleEdit = (pet) => {
    setEditingPet(pet._id);
    setEditFormData({
      name: pet.name,
      breed: pet.breed,
      age: pet.age,
      type: pet.type,
      description: pet.description,
      available: pet.available,
      image: null,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const data = new FormData();
    data.append('name', editFormData.name);
    data.append('breed', editFormData.breed);
    data.append('age', editFormData.age);
    data.append('type', editFormData.type);
    data.append('description', editFormData.description);
    data.append('available', editFormData.available);
    if (editFormData.image) data.append('image', editFormData.image);

    try {
      await axios.put(`http://localhost:5000/api/pets/${editingPet}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setEditingPet(null);
      fetchPets(user._id, token);
      setError('');
    } catch (err) {
      console.error('Update error:', err.response ? err.response.data : err.message);
      setError('Failed to update pet. Check console for details.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      const token = localStorage.getItem('token');
      try {
        await axios.delete(`http://localhost:5000/api/pets/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchPets(user._id, token);
        setError('');
      } catch (err) {
        console.error('Delete error:', err.response ? err.response.data : err.message);
        setError('Failed to delete pet. Check console for details.');
      }
    }
  };

  const handleEditChange = (e) => {
    if (e.target.name === 'image') {
      setEditFormData({ ...editFormData, image: e.target.files[0] });
    } else {
      setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    }
  };

  if (loading) return <div className="text-center mt-10 text-orange-600">Loading...</div>;
  if (!user) return <div className="text-center mt-10 text-gray-600">Please log in to view your pets.</div>;
  if (user.role !== 'Shelter')
    return <div className="text-center mt-10 text-red-500">Access denied. Only Shelters can view pets.</div>;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-orange-600">🐾 Your Pets</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {pets.length === 0 ? (
        <p className="text-center text-gray-600">No pets found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pets.map((pet) => (
            <div
              key={pet._id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
            >
              {pet.image && (
                <img
                  src={`http://localhost:5000${pet.image}`}
                  alt={pet.name}
                  className="w-full h-56 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{pet.name}</h3>
                <p className="text-gray-600"><strong>Breed:</strong> {pet.breed || 'Not specified'}</p>
                <p className="text-gray-600"><strong>Age:</strong> {pet.age || 'Not specified'}</p>
                <p className="text-gray-600"><strong>Type:</strong> {pet.type || 'Not specified'}</p>
                <p className="text-gray-600"><strong>Description:</strong> {pet.description || 'No description'}</p>
                <p className="text-gray-600">
                  <strong>Available:</strong>{' '}
                  <span className={pet.available ? 'text-green-600 font-semibold' : 'text-red-500 font-semibold'}>
                    {pet.available ? 'Yes' : 'No'}
                  </span>
                </p>

                {/* Edit Form */}
                {editingPet === pet._id ? (
                  <form onSubmit={handleUpdate} className="mt-4 space-y-2">
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                    <input
                      type="text"
                      name="breed"
                      value={editFormData.breed}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                    <input
                      type="number"
                      name="age"
                      value={editFormData.age}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                    <select
                      name="type"
                      value={editFormData.type}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded-lg"
                      required
                    >
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                      <option value="Other">Other</option>
                    </select>
                    <textarea
                      name="description"
                      value={editFormData.description}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                    <label className="flex items-center text-gray-700">
                      <input
                        type="checkbox"
                        name="available"
                        checked={editFormData.available}
                        onChange={(e) =>
                          setEditFormData({ ...editFormData, available: e.target.checked })
                        }
                        className="mr-2"
                      />
                      Available
                    </label>
                    <input
                      type="file"
                      name="image"
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded-lg"
                    />
                    <div className="flex space-x-2 mt-2">
                      <button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingPet(null)}
                        className="flex-1 bg-gray-500 text-white py-2 rounded-lg font-semibold hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={() => handleEdit(pet)}
                      className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(pet._id)}
                      className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewPets;
