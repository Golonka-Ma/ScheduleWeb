import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Notification from '../components/Notification';
import { Link, useNavigate } from 'react-router-dom';

// Import z Heroicons (jak w SchedulePage)
import { SunIcon, MoonIcon, ClockIcon } from '@heroicons/react/24/solid';

function Sidebar({ toggleDarkMode, darkMode }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    // Identyczne style sidebara jak w SchedulePage:
    <div className="h-screen w-64 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 fixed top-0 left-0 flex flex-col items-center py-8 border-r border-gray-300 dark:border-gray-700 shadow-md">
      {/* Logo + nazwa aplikacji */}
      <div className="mb-10 text-center">
        <ClockIcon className="w-16 h-16 mx-auto mb-2 text-blue-600 dark:text-blue-300" />
        <h1 className="text-2xl font-bold tracking-wide">Zarządzaj czasem</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Zarządzaj zadaniami
        </p>
      </div>

      {/* Link powrotu do kalendarza */}
      <Link
        to="/"
        className="mb-6 w-40 text-center px-4 py-2 bg-gray-200 dark:bg-gray-700
                   rounded-md hover:bg-gray-300 dark:hover:bg-gray-600
                   transition-colors duration-300 shadow-sm"
      >
        Powrót
      </Link>

      <div className="flex-1"></div>

      {/* Przycisk trybu ciemnego/jasnego */}
      <div
        className={`flex items-center justify-between w-40 px-4 py-2 mb-4 rounded-full cursor-pointer transition-colors duration-300 ${
          darkMode ? 'bg-yellow-400' : 'bg-blue-700'
        }`}
        onClick={toggleDarkMode}
      >
        {darkMode ? (
          <>
            <MoonIcon className="w-5 h-5 text-yellow-900 mr-2" />
            <span className="text-yellow-900 font-semibold">Tryb jasny</span>
          </>
        ) : (
          <>
            <SunIcon className="w-5 h-5 text-white mr-2" />
            <span className="text-white font-semibold">Tryb ciemny</span>
          </>
        )}
      </div>

      {/* Wylogowanie */}
      <button
        onClick={handleLogout}
        className="w-40 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors shadow-sm"
      >
        Wyloguj
      </button>
    </div>
  );
}

function UserSettingsPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Obsługa trybu ciemnego (jak w SchedulePage)
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const navigate = useNavigate();

  // Pobranie danych użytkownika
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/user/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = response.data;
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      // Nie pobieramy hasła (zaszyfrowane)
    } catch (error) {
      console.error(error);
      setErrorMsg('Nie udało się pobrać danych użytkownika.');
    }
  };

  // Zapis zmian
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:8080/api/user/me',
        {
          firstName,
          lastName,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMsg('Dane zostały zaktualizowane!');
      setPassword(''); // czyścimy pole hasła
    } catch (error) {
      console.error(error);
      setErrorMsg('Nie udało się zaktualizować danych użytkownika.');
    }
  };

  return (
    // Tło identyczne jak w SchedulePage (gradient + min-h-screen)
    <div className="flex bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      {/* Sidebar */}
      <Sidebar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

      {/* Główna zawartość */}
      <div className="ml-64 flex-1 container mx-auto py-8 px-6">
        <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-8">
          <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">
            Ustawienia użytkownika
          </h1>

          <Notification
            message={successMsg}
            type="success"
            show={!!successMsg}
            onClose={() => setSuccessMsg('')}
          />
          <Notification
            message={errorMsg}
            type="error"
            show={!!errorMsg}
            onClose={() => setErrorMsg('')}
          />

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Imię */}
            <div>
              <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                Imię
              </label>
              <input
                type="text"
                className="w-full p-2 rounded border border-gray-300 
                           dark:border-gray-600 dark:bg-gray-700 
                           dark:text-white focus:outline-none focus:ring-2 
                           focus:ring-blue-500 transition"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            {/* Nazwisko */}
            <div>
              <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                Nazwisko
              </label>
              <input
                type="text"
                className="w-full p-2 rounded border border-gray-300 
                           dark:border-gray-600 dark:bg-gray-700 
                           dark:text-white focus:outline-none focus:ring-2 
                           focus:ring-blue-500 transition"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            {/* Hasło */}
            <div>
              <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
                Nowe hasło (opcjonalne)
              </label>
              <input
                type="password"
                className="w-full p-2 rounded border border-gray-300 
                           dark:border-gray-600 dark:bg-gray-700 
                           dark:text-white focus:outline-none focus:ring-2 
                           focus:ring-blue-500 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Zostaw puste, aby nie zmieniać"
              />
            </div>

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 
                         text-white font-bold py-2 px-5 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-green-500
                         transition-colors active:scale-95"
            >
              Zapisz
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserSettingsPage;
