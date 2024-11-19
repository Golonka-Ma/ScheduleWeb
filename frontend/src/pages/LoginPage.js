import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import mainLogo from '../assets/logoans.png';

function LoginPage() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
      login(response.data.token);
      navigate('/');
    } catch (error) {
      console.error(error);
      setErrorMessage('Nieprawidłowy adres e-mail lub hasło.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-600 to-blue-600">
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
            <h2 className="text-3xl font-bold text-gray-800">Zaloguj się</h2>
            <p className="mt-2 text-sm text-gray-600">
              Nie masz konta?{' '}
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300"
              >
                Zarejestruj się tutaj
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
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-4">
                <label htmlFor="email-address" className="sr-only">
                  Adres e-mail
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full px-4 py-3 text-gray-900 placeholder-gray-500 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-colors duration-300"
                  placeholder="Adres e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="sr-only">
                  Hasło
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full px-4 py-3 text-gray-900 placeholder-gray-500 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-colors duration-300"
                  placeholder="Hasło"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="remember_me" className="block ml-2 text-sm text-gray-900">
                  Zapamiętaj mnie
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300"
                >
                  Zapomniałeś hasła?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`relative flex justify-center w-full px-4 py-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isLoading}
              >
                {isLoading ? 'Logowanie...' : 'Zaloguj się'}
              </button>
            </div>
          </form>
        </div>
      </Transition>
    </div>
  );
}

export default LoginPage;
