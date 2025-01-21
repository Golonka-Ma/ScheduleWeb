import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import mainLogo from '../assets/logoans.png';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);

    
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);

      
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }, 1500);
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
          {/* Sekcja z logiem i tytułem */}
          <div className="flex flex-col items-center">
            <img src={mainLogo} alt="Logo" className="w-60 h-20 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Zresetuj hasło
            </h2>
          </div>

          {/* Komunikat sukcesu */}
          {success && (
            <Transition
              show={true}
              enter="transition-opacity duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 border border-green-400 rounded-md">
                Link do resetowania hasła został wysłany na Twój adres e-mail.
              </div>
            </Transition>
          )}

          {/* Formularz resetu hasła */}
          <form className="space-y-6" onSubmit={handleResetPassword}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Adres e-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full px-4 py-3 text-gray-900 placeholder-gray-500
                           bg-gray-100 border border-gray-300 rounded-md
                           focus:outline-none focus:ring-2 focus:ring-indigo-500
                           focus:border-indigo-500 focus:z-10 transition-colors"
                placeholder="Podaj adres e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <button
                type="submit"
                className={`relative flex justify-center w-full px-4 py-3 text-sm
                            font-medium text-white bg-indigo-600 border
                            border-transparent rounded-md hover:bg-indigo-700
                            hover:shadow-lg focus:outline-none focus:ring-2
                            focus:ring-offset-2 focus:ring-indigo-500
                            transition-all duration-300 ${
                              isLoading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                disabled={isLoading}
              >
                {isLoading ? 'Wysyłanie...' : 'Zresetuj hasło'}
              </button>
            </div>
          </form>

          {/* Link powrotu do logowania */}
          <div className="mt-4 text-center text-sm text-gray-600">
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300"
            >
              Powrót do logowania
            </Link>
          </div>
        </div>
      </Transition>
    </div>
  );
}

export default ForgotPasswordPage;
