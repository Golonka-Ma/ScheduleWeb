import axios from 'axios';

const API_URL = 'http://localhost:8080/api/schedule';

const getToken = () => localStorage.getItem('token');

export const getSchedule = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

export const addScheduleItem = async (item) => {
  const response = await axios.post(API_URL, item, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};


export const updateScheduleItem = async (id, item) => {
  const response = await axios.put(`${API_URL}/${id}`, item, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};

export const deleteScheduleItem = async (id) => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};
