import React, { useState } from 'react';
import Modal from 'react-modal';

function AddScheduleItemModal({ isOpen, onClose, onAdd, selectedDate }) {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    location: '',
    startDate: selectedDate,
    startTime: '00:00',
    endDate: selectedDate,
    endTime: '01:00',
    description: '',
  });

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#1f2937', // Dark background
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
    // Combine date and time into ISO 8601 format
    const startTime = `${formData.startDate}T${formData.startTime}`;
    const endTime = `${formData.endDate}T${formData.endTime}`;
    onAdd({ ...formData, startTime, endTime });
    onClose(); // Close the modal after adding
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Dodaj zadanie" style={customStyles}>
      <h2 className="text-xl mb-4 text-white">Dodaj zadanie</h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <input
          type="text"
          name="title"
          className="border p-2 w-full mb-4 bg-gray-700 text-white rounded-lg"
          value={formData.title}
          onChange={handleChange}
          placeholder="Tytuł"
          required
        />

        {/* Type */}
        <input
          type="text"
          name="type"
          className="border p-2 w-full mb-4 bg-gray-700 text-white rounded-lg"
          value={formData.type}
          onChange={handleChange}
          placeholder="Typ"
          required
        />

        {/* Location */}
        <input
          type="text"
          name="location"
          className="border p-2 w-full mb-4 bg-gray-700 text-white rounded-lg"
          value={formData.location}
          onChange={handleChange}
          placeholder="Lokalizacja"
          required
        />

        {/* Start Date and Time */}
        <label className="block mb-2 text-white">Data rozpoczęcia</label>
        <input
          type="date"
          name="startDate"
          className="border p-2 w-full mb-4 bg-gray-700 text-white rounded-lg"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
        <label className="block mb-2 text-white">Godzina rozpoczęcia</label>
        <input
          type="time"
          name="startTime"
          className="border p-2 w-full mb-4 bg-gray-700 text-white rounded-lg"
          value={formData.startTime}
          onChange={handleChange}
          required
        />

        {/* End Date and Time */}
        <label className="block mb-2 text-white">Data zakończenia</label>
        <input
          type="date"
          name="endDate"
          className="border p-2 w-full mb-4 bg-gray-700 text-white rounded-lg"
          value={formData.endDate}
          onChange={handleChange}
          required
        />
        <label className="block mb-2 text-white">Godzina zakończenia</label>
        <input
          type="time"
          name="endTime"
          className="border p-2 w-full mb-4 bg-gray-700 text-white rounded-lg"
          value={formData.endTime}
          onChange={handleChange}
          required
        />

        {/* Description */}
        <textarea
          name="description"
          className="border p-2 w-full mb-4 bg-gray-700 text-white rounded-lg"
          value={formData.description}
          onChange={handleChange}
          placeholder="Opis"
          required
        />

        {/* Buttons */}
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
