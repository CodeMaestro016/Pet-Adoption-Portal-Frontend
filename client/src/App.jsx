import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import ViewPets from './pages/ViewPets'; // New page to view pets
import AddPet from './pages/AddPet'; // New page to add pets
import PetListings from './pages/PetListings';
import Footer from './components/Footer'; // Importing the Footer component

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <div className="p-4 max-w-4xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/view-pets" element={<ViewPets />} />
            <Route path="/add-pet" element={<AddPet />} />
            <Route path="/pet-listings" element={<PetListings />} />
          </Routes>
        </div>
        <Footer /> {/* Adding the Footer component */}
      </div>
    </Router>
  );
}

export default App;