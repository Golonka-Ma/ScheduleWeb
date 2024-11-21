import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import plLocale from '@fullcalendar/core/locales/pl';
import {getSchedule,addScheduleItem,updateScheduleItem,deleteScheduleItem,} from '../services/scheduleService';
import AddScheduleItemModal from '../components/AddScheduleItemModal';
import EditScheduleItemModal from '../components/EditScheduleItemModal';
import { useNavigate } from "react-router-dom";
import Notification from '../components/Notification';
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

const Sidebar = ({ toggleDarkMode, darkMode }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <div className="h-screen w-64 bg-gray-300 dark:bg-gray-800 text-gray-900 dark:text-gray-100 fixed top-0 left-0 flex flex-col items-center py-6">
      <div className="mb-10">
        <h1 className="text-2xl font-bold">Mój Harmonogram</h1>
      </div>
      <a
        href="#"
        className="mb-6 px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 focus:outline-none"
      >
        Ustawienia użytkownika
      </a>
      
            {/* Spacer */}
            <div className="flex-1"></div>

{/* Dark Mode Toggle */}
<div
  className={`flex items-center justify-between w-40 px-4 py-2 rounded-full cursor-pointer ${
    darkMode ? "bg-yellow-400" : "bg-blue-800"
  }`}
  onClick={toggleDarkMode}
>
  {darkMode ? (
    <>
      <MoonIcon className="w-6 h-6 text-yellow-800" />
      <span className="text-yellow-800 font-semibold">Tryb jasny</span>
    </>
  ) : (
    <>
      <SunIcon className="w-6 h-6 text-white" />
      <span className="text-white font-semibold">Tryb ciemny</span>
    </>
  )}
</div>

{/* Logout Button */}
<button
  onClick={handleLogout}
  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
>
  Wyloguj się
</button>
</div>
);
};

const SchedulePage = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  
  
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  
  // Effect hook to apply the dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);
  
  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };
  

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const scheduleData = await getSchedule();
      setEvents(scheduleData);
    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
  };

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    setEditingEvent(null);
    setModalOpen(true);
  };

  const handleEventClick = (clickInfo) => {
    const { id, title, startStr, endStr, extendedProps } = clickInfo.event;
    setEditingEvent({
      id,
      title,
      startDate: startStr.split('T')[0],
      startTime: startStr.split('T')[1],
      endDate: endStr.split('T')[0],
      endTime: endStr.split('T')[1],
      description: extendedProps.description,
      type: extendedProps.type,
      location: extendedProps.location,
      priority: extendedProps.priority,
    });
    setModalOpen(true); // Open modal for editing
  };

  const handleEventAdd = async (eventData) => {
    try {
      const newEvent = await addScheduleItem(eventData);
      setEvents([...events, { ...newEvent, display: 'auto' }]);
      setModalOpen(false); // Close modal
      setSuccessMessage('Dodano zadanie do kalendarza!');
      fetchEvents(); // Refresh fullcalender
    } catch (error) {
      setErrorMessage('Błąd podczas dodawania zadania do kalendarza.');
      console.error('Error adding event:', error);
    }
  };

  const handleEventEdit = async (updatedData) => {
    try {
      const updatedEvent = await updateScheduleItem(editingEvent.id, updatedData);
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === editingEvent.id ? updatedEvent : event
        )
      );
      setModalOpen(false); // Close modal
      fetchEvents(); // Refresh fullcalender
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleEventDelete = async (id) => {
    try {
      await deleteScheduleItem(id);
      setEvents(events.filter((event) => event.id !== id));
      fetchEvents(); // Refresh fullcalender
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className={`flex bg-gray-100 dark:bg-gray-900 min-h-screen`}>
    {/* Sidebar */}
    <Sidebar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
    <div className="ml-64 flex-1 container bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white mx-auto p-4 rounded-md">
        <h1 className="text-2xl mb-4">Kalendarz</h1>
      <button
        onClick={() => {
          setSelectedDate(null);
          setEditingEvent(null);
          setModalOpen(true);
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition mb-4"
      >
        Dodaj zadanie
      </button>
      <FullCalendar
  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
  initialView="dayGridMonth"
events={events.map((event) => ({
    ...event,
    backgroundColor: 
      event.extendedProps.priority === 'high' ? '#FF6347' : 
      event.extendedProps.priority === 'medium' ? '#FFD700' : 
      '#90EE90',
    borderColor: '#FFDE21',
  }))}
  eventTimeFormat={{
    hour: '2-digit',
    minute: '2-digit',
    meridiem: false,
  }}
  dateClick={handleDateClick}
  eventClick={handleEventClick}
  editable={true}
  locales={[plLocale]}
  locale="pl"
  headerToolbar={{
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay',
  }}
/>

      {modalOpen && (
        editingEvent ? (
          <EditScheduleItemModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onEdit={handleEventEdit}
            onDelete={handleEventDelete}
            taskData={editingEvent}
          />
        ) : (
          <AddScheduleItemModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onAdd={handleEventAdd}
            selectedDate={selectedDate}
          />
        )
      )}
    </div>
    </div>
  );
};

export default SchedulePage;