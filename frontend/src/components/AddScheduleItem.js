import React, { useState } from 'react';
import axios from 'axios';

function AddScheduleItem({ onAdd }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('MONDAY');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.post('http://localhost:8080/api/schedule', {
      title,
      type,
      location,
      dayOfWeek,
      startTime,
      endTime
    }, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => {
        onAdd(response.data);
        // Resetowanie formularza
        setTitle('');
        setType('');
        setLocation('');
        setDayOfWeek('MONDAY');
        setStartTime('');
        setEndTime('');
      })
      .catch(error => {
        console.error(error);
        alert('Failed to add schedule item');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md mb-4">
      <h2 className="text-xl mb-4">Add Schedule Item</h2>
      {/* Pola formularza */}
      <input
        type="text"
        className="border p-2 w-full mb-4"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      {/* Pozostałe pola */}
      <button type="submit" className="bg-green-500 text-white p-2 w-full">Add Item</button>
    </form>
  );
}

export default AddScheduleItem;
