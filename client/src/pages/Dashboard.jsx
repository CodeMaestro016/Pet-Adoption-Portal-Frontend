import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        setUser(res.data);
      }).catch(() => {
        localStorage.removeItem('token');
      });
    }
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <p>Welcome, {user.name} ({user.role})!</p>
      {user.role === 'Shelter' && <p>Manage your pets and adoption requests here.</p>}
      {user.role === 'Adopter' && <p>View your adoption requests here.</p>}
    </div>
  );
};

export default Dashboard;