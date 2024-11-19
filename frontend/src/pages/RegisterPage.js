import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import Notification from '../components/Notification';
import mainLogo from '../assets/logoans.png';

function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);
    try {
      await axios.post('http://localhost:8080/api/auth/register', { firstName, lastName, email, password });
      setSuccessMessage('Rejestracja zakończona sukcesem! Możesz się teraz zalogować.');
      setShowSuccess(true);

      // Resetowanie formularza
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');

      // Przekierowanie po 3 sekundach
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.error(error);
      setErrorMessage('Rejestracja nie powiodła się. Upewnij się, że dane są poprawne i spróbuj ponownie.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-600 to-blue-600">
      {/* Komponent powiadomienia */}
      <Notification
        message={successMessage}
        type="success"
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
      />

      <Transition
        appear
        show={true}
        enter="transform transition duration-500"
        enterFrom="opacity-0 -translate-y-10"
        enterTo="opacity-100 translate-y-0"
      >
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
          <div className="flex flex-col items-center">
            {/* Logo lub ikona */}
            <img src={mainLogo} alt="Logo" className="w-60 h-20 mb-4" />
            <h2 className="text-3xl font-bold text-gray-800">Zarejestruj się</h2>
            <p className="mt-2 text-sm text-gray-600">
              Masz już konto?{' '}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-300"
              >
                Zaloguj się tutaj
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {errorMessage && (
              <Transition
                show={true}
                enter="transition-opacity duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="p-4 text-sm text-red-700 bg-red-100 border border-red-400 rounded-md">
                  {errorMessage}
                </div>
              </Transition>
            )}
            <div className="space-y-4">
              <div>
                <label htmlFor="first-name" className="sr-only">
                  Imię
                </label>
                <input
                  id="first-name"
                  name="firstName"
                  type="text"
                  required
                  className="relative block w-full px-4 py-3 text-gray-900 placeholder-gray-500 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-colors duration-300"
                  placeholder="Imię"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="last-name" className="sr-only">
                  Nazwisko
                </label>
                <input
                  id="last-name"
                  name="lastName"
                  type="text"
                  required
                  className="relative block w-full px-4 py-3 text-gray-900 placeholder-gray-500 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-colors duration-300"
                  placeholder="Nazwisko"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Adres e-mail
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full px-4 py-3 text-gray-900 placeholder-gray-500 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-colors duration-300"
                  placeholder="Adres e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Hasło
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="relative block w-full px-4 py-3 text-gray-900 placeholder-gray-500 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-colors duration-300"
                  placeholder="Hasło"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`relative flex justify-center w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md group hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isLoading}
              >
                {isLoading ? 'Rejestrowanie...' : 'Zarejestruj się'}
              </button>
            </div>
          </form>
        </div>
      </Transition>
    </div>
  );
}

export default RegisterPage;
