'use client';

import { useState } from 'react';
import { ShoppingCart, Plus, Heart, Star, DollarSign } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Mock data for demonstration
const mockItems = [
  {
    id: 1,
    name: "Vintage Camera",
    price: 299.99,
    description: "Beautiful vintage camera in excellent condition",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop",
    category: "Electronics"
  },
  {
    id: 2,
    name: "Handcrafted Wooden Chair",
    price: 199.99,
    description: "Unique handcrafted wooden chair with modern design",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=300&fit=crop",
    category: "Furniture"
  },
  {
    id: 3,
    name: "Artisan Coffee Mug Set",
    price: 49.99,
    description: "Set of 4 beautifully crafted ceramic coffee mugs",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    category: "Kitchen"
  },
  {
    id: 4,
    name: "Leather Backpack",
    price: 129.99,
    description: "Premium leather backpack with multiple compartments",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    category: "Fashion"
  }
];

export default function Home() {
  const router = useRouter();
  const [items] = useState(mockItems);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Electronics', 'Furniture', 'Kitchen', 'Fashion'];

  const filteredItems = selectedCategory === 'All' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  const handlePostItem = () => {
    router.push('/post');
  };

  const handleTransfer = () => {
    router.push('/transfer');
  };

  const handleBuyNow = (itemId) => {
    router.push(`/payment?itemId=${itemId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <ShoppingCart className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">aimeeling</h1>
            </div>
            <div className="hidden md:flex gap-3">
              <button 
                onClick={handleTransfer}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <DollarSign className="h-4 w-4" />
                Transfer Money
              </button>
              <button 
                onClick={handlePostItem}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Post Item
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Discover Unique Items</h2>
          <p className="text-xl mb-8 text-blue-100">Find amazing products from talented creators</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <input 
              type="text" 
              placeholder="Search items..." 
              className="px-4 py-2 rounded-lg text-gray-900 w-full sm:w-64"
            />
            <div className="flex gap-2">
              <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Search
              </button>
              <button 
                onClick={handleTransfer}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <DollarSign className="h-4 w-4" />
                Quick Transfer
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Items Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                  <Heart className="h-4 w-4 text-gray-600" />
                </button>
                <div className="absolute bottom-3 left-3">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {item.category}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">4.8</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">${item.price}</span>
                  <button 
                    onClick={() => handleBuyNow(item.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">aimeeling</h3>
              <p className="text-gray-400">Discover unique items from talented creators around the world.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Electronics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Furniture</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fashion</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 aimeeling. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
