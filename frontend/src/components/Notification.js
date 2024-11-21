import React from 'react';
import { Transition } from '@headlessui/react';

function Notification({ message, type = 'success', show, onClose }) {
  const typeStyles = {
    success: 'bg-green-100 border-green-400 text-green-700',
    error: 'bg-red-100 border-red-400 text-red-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
  };

  return (
    <Transition
      show={show}
      enter="transition-opacity duration-500 transform"
      enterFrom="opacity-0 translate-y-2"
      enterTo="opacity-100 translate-y-0"
      leave="transition-opacity duration-500 transform"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-2"
    >
      <div className="fixed top-4 right-4 z-50">
        <div className={`border-l-4 p-4 ${typeStyles[type]} rounded-md shadow-md`}>
          <div className="flex items-center">
            <div className="flex-1">
              <p className="text-sm">{message}</p>
            </div>
            <button onClick={onClose} className="ml-4 text-lg font-bold focus:outline-none">
              &times;
            </button>
          </div>
        </div>
      </div>
    </Transition>
  );
}

export default Notification;
