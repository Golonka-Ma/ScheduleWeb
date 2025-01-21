import axios from 'axios';

const API_URL = 'http://localhost:8080/api/schedule';

const getToken = () => localStorage.getItem('token');

// Fetch all schedule items
export const getSchedule = async () => {
  const response = await axios.get(`${API_URL}/list`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  
  return response.data.map((item) => ({
    id: item.id,
    title: item.title,
    start: item.startTime,
    end: item.endTime,
    extendedProps: {
      description: item.description,
      type: item.type,
      location: item.location,
      priority: item.priority,
    },
  }));
};


// Add a schedule item
export const addScheduleItem = async (item) => {
  const response = await axios.post(`${API_URL}/add`, item, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data; // Expecting the saved event object
}

// Update a schedule item
export const updateScheduleItem = async (id, item) => {
  try {
    const response = await axios.put(`${API_URL}/update/${id}`, item, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error) {
    console.error(error.response?.data || 'Error updating schedule item');
    throw error;
  }
};

// Delete a schedule item
export const deleteScheduleItem = async (id) => {
  try {
    await axios.delete(`${API_URL}/delete/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return true;
  } catch (error) {
    console.error(error.response?.data || 'Error deleting schedule item');
    throw error;
  }
};
