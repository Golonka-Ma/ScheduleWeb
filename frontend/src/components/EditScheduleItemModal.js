import React, { useState } from 'react';
import Modal from 'react-modal';

function EditScheduleItemModal({ isOpen, onClose, onAdd, selectedDate }) {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    location: '',
    startTime: selectedDate,
    endTime: selectedDate,
    description: '',
  });

  // Definiowanie stylów modala
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#1f2937', // ciemny kolor tła
      border: 'none',
      borderRadius: '8px',
      padding: '20px',
      width: '500px',
      maxWidth: '90%',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 1000,
    },
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Dodaj zadanie" style={customStyles}>
      <h2 className="text-xl mb-4 text-white">Dodaj zadanie</h2>
      <form onSubmit={handleSubmit}>
        {/* Pole tytułu */}
        <input
          type="text"
          name="title"
          className="border p-2 w-full mb-4 bg-gray-700 border-gray-300 text-white text-stm font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={formData.title}
          onChange={handleChange}
          placeholder="Tytuł"
          required
        />

        {/* Pole typu */}
        <input
          type="text"
          name="type"
          className="border p-2 w-full mb-4 bg-gray-700 border-gray-300 text-white text-stm font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={formData.type}
          onChange={handleChange}
          placeholder="Typ"
          required
        />

        {/* Pole lokalizacji */}
        <input
          type="text"
          name="location"
          className="border p-2 w-full mb-4 bg-gray-700 border-gray-300 text-white text-stm font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={formData.location}
          onChange={handleChange}
          placeholder="Lokalizacja"
          required
        />

        {/* Pole dnia tygodnia */}
        <select
          name="dayOfWeek"
          className="border p-2 w-full mb-4 bg-gray-700 border-gray-300 text-white text-stm font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={formData.dayOfWeek}
          onChange={handleChange}
          required
        >
          <option value="">Wybierz dzień tygodnia</option>
          <option value="MONDAY">Poniedziałek</option>
          <option value="TUESDAY">Wtorek</option>
          <option value="WEDNESDAY">Środa</option>
          <option value="THURSDAY">Czwartek</option>
          <option value="FRIDAY">Piątek</option>
          <option value="SATURDAY">Sobota</option>
          <option value="SUNDAY">Niedziela</option>
        </select>

        {/* Pole daty i godziny rozpoczęcia */}
        <label className="block mb-2 text-white">Data i godzina rozpoczęcia</label>
        <input
          type="datetime-local"
          name="startTime"
          className="border p-2 w-full mb-4 bg-gray-700 border-gray-300 text-white text-stm font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={formData.startTime}
          onChange={handleChange}
          required
        />

        {/* Pole daty i godziny zakończenia */}
        <label className="block mb-2 text-white">Data i godzina zakończenia</label>
        <input
          type="datetime-local"
          name="endTime"
          className="border p-2 w-full mb-4 bg-gray-700 border-gray-300 text-white text-stm font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={formData.endTime}
          onChange={handleChange}
          required
        />

        {/* Pole opisu */}
        <textarea
          name="description"
          className="border p-2 w-full mb-4 bg-gray-700 border-gray-300 text-white text-stm font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={formData.description}
          onChange={handleChange}
          placeholder="Opis"
        />

        {/* Przyciski */}
        <div className="flex justify-end">
          <button type="button" onClick={onClose} className="bg-gray-500 text-white font-medium p-2 px-8 mr-2 rounded-lg">
            Anuluj
          </button>
          <button type="submit" className="bg-green-500 text-white font-medium p-2 px-8 mr-2 rounded-lg">
            Dodaj
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default EditScheduleItemModal;
