import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

function AddScheduleItemModal({ isOpen, onClose, onAdd, selectedDate }) {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    location: '',
    startDate: selectedDate || '',
    startTime: '00:00',
    endDate: selectedDate || '',
    endTime: '01:00',
    description: '',
    priority: 'low',
  });

  useEffect(() => {
    if (selectedDate) {
      setFormData((prevState) => ({
        ...prevState,
        startDate: selectedDate,
        endDate: selectedDate,
      }));
    }
  }, [selectedDate]);

  const customStyles = {
    content: {
      // ... Twoje style ...
      backgroundColor: '#1f2937',
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
    try {
      if (!formData.startDate || !formData.startTime || !formData.endDate || !formData.endTime) {
        throw new Error('Wszystkie pola daty i czasu muszą być wypełnione.');
      }
      const startTime = `${formData.startDate}T${formData.startTime}`;
      const endTime = `${formData.endDate}T${formData.endTime}`;
      if (new Date(startTime) >= new Date(endTime)) {
        throw new Error('Czas rozpoczęcia musi być wcześniejszy niż czas zakończenia.');
      }
      onAdd({
        title: formData.title,
        type: formData.type,
        location: formData.location,
        startTime,
        endTime,
        description: formData.description,
        priority: formData.priority,
      });
      onClose();
    } catch (error) {
      console.error('Validation Error:', error.message);
      alert(error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Dodaj zadanie" style={customStyles}>
      <h2 className="text-xl mb-4 text-white">Dodaj zadanie</h2>
      <form onSubmit={handleSubmit}>
        {/* Tytuł */}
        <input
          type="text"
          name="title"
          className="border p-2 w-full mb-4 bg-gray-700 text-white rounded-lg"
          value={formData.title}
          onChange={handleChange}
          placeholder="Tytuł"
          required
        />

        {/* Typ */}
        <input
          type="text"
          name="type"
          className="border p-2 w-full mb-4 bg-gray-700 text-white rounded-lg"
          value={formData.type}
          onChange={handleChange}
          placeholder="Typ"
          required
        />

        {/* Lokalizacja */}
        <input
          type="text"
          name="location"
          className="border p-2 w-full mb-4 bg-gray-700 text-white rounded-lg"
          value={formData.location}
          onChange={handleChange}
          placeholder="Lokalizacja"
          required
        />

        {/* Priorytet */}
        <label className="block mb-2 text-white">Priorytet</label>
        <select
          name="priority"
          className="border p-2 w-full mb-4 bg-gray-700 text-white rounded-lg"
          value={formData.priority}
          onChange={handleChange}
          required
        >
          <option value="low">Niski</option>
          <option value="medium">Średni</option>
          <option value="high">Wysoki</option>
        </select>

        {/* Data rozpoczęcia */}
        <label className="block mb-2 text-white">Data rozpoczęcia</label>
        <input
          type="date"
          name="startDate"
          className="border p-2 w-full mb-4 bg-gray-700 text-white rounded-lg"
          value={formData.startDate}
          onChange={handleChange}
          required
        />

        {/* Godzina rozpoczęcia */}
        <label className="block mb-2 text-white">Godzina rozpoczęcia</label>
        <input
          type="time"
          name="startTime"
          className="border p-2 w-full mb-4 bg-gray-700 text-white rounded-lg"
          value={formData.startTime}
          onChange={handleChange}
          required
        />

        {/* Data zakończenia */}
        <label className="block mb-2 text-white">Data zakończenia</label>
        <input
          type="date"
          name="endDate"
          className="border p-2 w-full mb-4 bg-gray-700 text-white rounded-lg"
          value={formData.endDate}
          onChange={handleChange}
          required
        />

        {/* Godzina zakończenia */}
        <label className="block mb-2 text-white">Godzina zakończenia</label>
        <input
          type="time"
          name="endTime"
          className="border p-2 w-full mb-4 bg-gray-700 text-white rounded-lg"
          value={formData.endTime}
          onChange={handleChange}
          required
        />

        {/* Opis */}
        <textarea
          name="description"
          className="border p-2 w-full mb-4 bg-gray-700 text-white rounded-lg"
          value={formData.description}
          onChange={handleChange}
          placeholder="Opis zadania"
          required
        />

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white font-medium p-2 px-8 mr-2 rounded-lg"
          >
            Anuluj
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white font-medium p-2 px-8 rounded-lg"
          >
            Dodaj
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AddScheduleItemModal;
