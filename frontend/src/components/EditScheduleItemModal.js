import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

function EditScheduleItemModal({ isOpen, onClose, onEdit, onDelete, taskData }) {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    location: '',
    startTime: '',
    endTime: '',
    description: '',
    priority: 'low',
  });

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#1f2937',
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

  useEffect(() => {
    if (taskData) {
      setFormData({
        title: taskData.title || '',
        type: taskData.type || '',
        location: taskData.location || '',
        startTime: taskData.start || '',
        endTime: taskData.end || '',
        description: taskData.description || '',
        priority: taskData.priority || 'low',
      });
    }
  }, [taskData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(formData);
  };

  const handleDelete = () => {
    if (window.confirm('Czy na pewno chcesz usunąć to zadanie?')) {
      onDelete(taskData.id);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <h2 className="text-xl mb-4 text-white">Edytuj zadanie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          className="border p-2 w-full mb-4 bg-gray-700 text-white rounded-lg"
          value={formData.title}
          onChange={handleChange}
          placeholder="Tytuł"
          required
        />
        <input
          type="text"
          name="type"
          className="border p-2 w-full mb-4 bg-gray-700 text-white rounded-lg"
          value={formData.type}
          onChange={handleChange}
          placeholder="Typ"
          required
        />
        <input
          type="text"
          name="location"
          className="border p-2 w-full mb-4 bg-gray-700 text-white rounded-lg"
          value={formData.location}
          onChange={handleChange}
          placeholder="Lokalizacja"
          required
        />

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

        <label className="block mb-2 text-white">Data i godzina rozpoczęcia</label>
        <input
          type="datetime-local"
          name="startTime"
          className="border p-2 w-full mb-4 bg-gray-700 text-white rounded-lg"
          value={formData.startTime}
          onChange={handleChange}
          required
        />

        <label className="block mb-2 text-white">Data i godzina zakończenia</label>
        <input
          type="datetime-local"
          name="endTime"
          className="border p-2 w-full mb-4 bg-gray-700 text-white rounded-lg"
          value={formData.endTime}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          className="border p-2 w-full mb-4 bg-gray-700 text-white rounded-lg"
          value={formData.description}
          onChange={handleChange}
          placeholder="Opis zadania"
          required
        />

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white p-2 px-4 rounded-lg"
          >
            Usuń
          </button>
          <div>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white p-2 px-4 rounded-lg mr-2"
            >
              Anuluj
            </button>
            <button type="submit" className="bg-green-500 text-white p-2 px-4 rounded-lg">
              Zapisz
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default EditScheduleItemModal;