import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import AddScheduleItem from '../components/AddScheduleItem';

function SchedulePage() {
  const [scheduleItems, setScheduleItems] = useState([]);
  const { logout } = useContext(AuthContext);

  const handleAddItem = (newItem) => {
    setScheduleItems([...scheduleItems, newItem]);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8080/api/schedule', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => {
        setScheduleItems(response.data);
      })
      .catch(error => {
        console.error(error);
        if (error.response.status === 401) {
          logout();
        }
      });
  }, [logout]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Your Schedule</h1>
      <AddScheduleItem onAdd={handleAddItem} />
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Day</th>
            <th className="px-4 py-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {scheduleItems.map(item => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.title}</td>
              <td className="border px-4 py-2">{item.type}</td>
              <td className="border px-4 py-2">{item.location}</td>
              <td className="border px-4 py-2">{item.dayOfWeek}</td>
              <td className="border px-4 py-2">{item.startTime} - {item.endTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SchedulePage;
