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
  });

  // Modal styles
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
        startTime: taskData.start || '', // Ensure proper format for datetime-local
        endTime: taskData.end || '', // Ensure proper format for datetime-local
        description: taskData.description || '',
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
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(taskData.id);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <h2 className="text-xl mb-4 text-white">Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          className="border p-2 w-full mb-4 bg-gray-700 text-white rounded-lg"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <input
          type="text"
          name="type"
          className="border p-2 w-full mb-4 bg-gray-700 text-white rounded-lg"
          value={formData.type}
          onChange={handleChange}
          placeholder="Type"
          required
        />
        <input
          type="text"
          name="location"
          className="border p-2 w-full mb-4 bg-gray-700 text-white rounded-lg"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          required
        />
        <label className="block mb-2 text-white">Start Time</label>
        <input
          type="datetime-local"
          name="startTime"
          className="border p-2 w-full mb-4 bg-gray-700 text-white rounded-lg"
          value={formData.startTime}
          onChange={handleChange}
          required
        />
        <label className="block mb-2 text-white">End Time</label>
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
          placeholder="Description"
          required
        />
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white p-2 px-4 rounded-lg"
          >
            Delete
          </button>
          <div>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white p-2 px-4 rounded-lg mr-2"
            >
              Cancel
            </button>
            <button type="submit" className="bg-green-500 text-white p-2 px-4 rounded-lg">
              Save
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default EditScheduleItemModal;
