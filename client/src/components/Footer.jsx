import React from 'react';
import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-orange-50 border-t-4 border-orange-500">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center mb-4">
              <Heart className="h-8 w-8 text-orange-500 mr-2" />
              <h3 className="text-2xl font-bold text-gray-800">PawsHome</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Connecting loving families with pets in need. Every adoption saves a life and creates endless joy.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 text-orange-500 hover:text-orange-600 cursor-pointer transition-colors" />
              <Twitter className="h-6 w-6 text-orange-500 hover:text-orange-600 cursor-pointer transition-colors" />
              <Instagram className="h-6 w-6 text-orange-500 hover:text-orange-600 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">Adopt a Pet</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">Foster Care</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">Volunteer</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">Donate</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">Pet Care Tips</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">Pet Training</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">Veterinary Care</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">Grooming</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">Pet Supplies</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">Emergency Care</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-orange-500 mr-3" />
                <span className="text-gray-600">(77) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-orange-500 mr-3" />
                <span className="text-gray-600">info@pawshome.org</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-orange-500 mr-3 mt-1" />
                <span className="text-gray-600">123 Pet Lane<br />Malabe, Colombo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-orange-200">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Stay Updated</h4>
            <p className="text-gray-600 mb-4">Get the latest news about adoptable pets and events</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-white text-sm">
              © 2025 PawsHome. All rights reserved. Made with ❤️ for pets in need.
            </p>
            <div className="flex space-x-6 mt-2 sm:mt-0">
              <a href="#" className="text-white hover:text-orange-200 text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-white hover:text-orange-200 text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-white hover:text-orange-200 text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;