import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) fetchUserAndRequests(token);
    else setLoading(false);
  }, []);

  const fetchUserAndRequests = async (token) => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      fetchRequests(res.data.role, token);
    } catch (err) {
      console.error('Auth error:', err);
      localStorage.removeItem('token');
      setUser(null);
      setLoading(false);
    }
  };

  const fetchRequests = async (role, token) => {
    setLoading(true);
    try {
      const url = role === 'Adopter' ? '/api/my-adoptions' : '/api/adoptions';
      const res = await axios.get(`http://localhost:5000${url}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Fetch requests error:', err);
      setError('Failed to fetch requests.');
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(
        `http://localhost:5000/api/adoptions/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRequests((prev) =>
        prev.map((req) => (req._id === id ? { ...req, status: response.data.status } : req))
      );
      setError(`Request ${status} successfully!`);
    } catch (err) {
      console.error('Update status error:', err.response || err.message);
      setError('Failed to update adoption status.');
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-orange-600 text-xl font-semibold">Loading...</p>
        </div>
      </div>
    );
  if (!user)
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Authentication Required</h2>
          <p className="text-gray-600">Please log in.</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">📊 Dashboard</h2>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 inline-block">
              <p className="text-xl md:text-2xl">
                Welcome, <span className="font-bold">{user.name}</span> 
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {error && (
          <div className={`mb-8 p-4 rounded-xl border ${
            error.includes('successfully') 
              ? 'bg-green-50 border-green-200 text-green-700' 
              : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            <div className="flex items-center">
              <span className="text-xl mr-3">
                {error.includes('successfully') ? '✅' : '⚠️'}
              </span>
              <p className="font-medium">{error}</p>
            </div>
          </div>
        )}

        {user.role === 'Adopter' && (
          <div>
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold text-gray-800 mb-4">My Adoption Requests</h3>
              <p className="text-xl text-gray-600">Track the status of your pet adoption applications</p>
            </div>
            {requests.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
                <div className="text-8xl mb-6">🐾</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">No adoption requests found.</h3>
                <p className="text-gray-600 text-lg">You haven't submitted any adoption requests yet. Browse available pets to get started!</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {requests.map((req) => (
                  <div
                    key={req._id}
                    className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                        <span className="text-2xl">🐕</span>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-gray-800">{req.petId?.name}</h4>
                        <p className="text-gray-600">Breed: {req.petId?.breed || 'Unknown'}</p>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 font-medium">Status:</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${req.status === 'Accepted' ? 'bg-green-100 text-green-700' : req.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {req.status === 'Accepted' && '✅ '}
                          {req.status === 'Rejected' && '❌ '}
                          {req.status === 'Pending' && '⏳ '}
                          {req.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {user.role === 'Shelter' && (
          <div className="mt-8">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold text-gray-800 mb-4">Adoption Requests</h3>
              <p className="text-xl text-gray-600">Review and manage incoming adoption applications</p>
            </div>
            {requests.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
                <div className="text-8xl mb-6">📋</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">No adoption requests found.</h3>
                <p className="text-gray-600 text-lg">No adoption requests have been submitted yet.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {requests.map((req) => (
                  <div
                    key={req._id}
                    className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                        <span className="text-2xl">🐕</span>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-gray-800">{req.petId?.name}</h4>
                        <p className="text-gray-600">Adopter: {req.adopterId?.name}</p>
                      </div>
                    </div>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 font-medium">Status:</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${req.status === 'Accepted' ? 'bg-green-100 text-green-700' : req.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {req.status === 'Accepted' && '✅ '}
                          {req.status === 'Rejected' && '❌ '}
                          {req.status === 'Pending' && '⏳ '}
                          {req.status}
                        </span>
                      </div>
                    </div>
                    {req.status === 'Pending' && (
                      <div className="flex gap-3 mt-4">
                        <button
                          onClick={() => handleUpdateStatus(req._id, 'Accepted')}
                          className="flex-1 bg-green-500 text-white py-2 rounded-xl font-semibold hover:bg-green-600 transition"
                        >
                          ✅ Approve
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(req._id, 'Rejected')}
                          className="flex-1 bg-red-500 text-white py-2 rounded-xl font-semibold hover:bg-red-600 transition"
                        >
                          ❌ Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;