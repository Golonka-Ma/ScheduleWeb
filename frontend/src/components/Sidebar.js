// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiUser, FiLogOut, FiSun, FiMoon } from 'react-icons/fi';

function Sidebar({ darkMode, setDarkMode, onLogout, user }) {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col fixed">
      <div className="p-4">
        <h2 className="text-xl font-bold">Aplikacja</h2>
        {user && <p className="text-sm">{user.email}</p>}
      </div>
      <nav className="flex-1 p-4">
        <Link to="/" className="flex items-center mb-4 hover:text-gray-400">
          <FiHome className="mr-2" /> Strona główna
        </Link>
        <Link to="/users" className="flex items-center mb-4 hover:text-gray-400">
          <FiUser className="mr-2" /> Użytkownicy
        </Link>
        {/* Dodaj inne linki tutaj */}
      </nav>
      <div className="p-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center mb-4 hover:text-gray-400 w-full"
        >
          {darkMode ? <FiSun className="mr-2" /> : <FiMoon className="mr-2" />}
          {darkMode ? 'Tryb jasny' : 'Tryb ciemny'}
        </button>
        <button onClick={onLogout} className="flex items-center hover:text-gray-400 w-full">
          <FiLogOut className="mr-2" /> Wyloguj się
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
