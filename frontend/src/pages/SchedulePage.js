import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import plLocale from '@fullcalendar/core/locales/pl';
import {
  getSchedule,
  addScheduleItem,
  updateScheduleItem,
  deleteScheduleItem,
} from '../services/scheduleService';
import AddScheduleItemModal from '../components/AddScheduleItemModal';
import { useNavigate } from "react-router-dom";

const Sidebar = ({ toggleDarkMode, darkMode }) => {
  const navigate = useNavigate(); // Hook do nawigacji

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Usuń token lub dane sesji
    navigate("/login"); // Przekierowanie do strony logowania
  };

  return (
    <div className="h-screen w-64 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 fixed top-0 left-0 flex flex-col items-center py-6">
      <div className="mb-10">
        <h1 className="text-2xl font-bold">My Schedule</h1>
      </div>
      <button
        onClick={toggleDarkMode}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <a
        href="#"
        className="mb-6 px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 focus:outline-none"
      >
        User Settings
      </a>
      <button
        onClick={handleLogout}
        className="mt-auto mb-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
      >
        Logout
      </button>
    </div>
  );
};

const SchedulePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setModalOpen(true);
  };

  const handleEventClick = (info) => {
    setEditingEvent(info.event);
    setModalOpen(true);
  };

  const handleEventDrop = (info) => {
    const updatedEvents = events.map((event) =>
      event.id === info.event.id
        ? { ...event, start: info.event.startStr, end: info.event.endStr }
        : event
    );
    setEvents(updatedEvents);
  };

  const handleEventAdd = (newEvent) => {
    setEvents([...events, newEvent]);
    setModalOpen(false);
  };

  const handleEventEdit = (updatedEvent) => {
    const updatedEvents = events.map((event) =>
      event.id === updatedEvent.id ? updatedEvent : event
    );
    setEvents(updatedEvents);
    setModalOpen(false);
  };

  return (
    <div className={`flex bg-gray-100 dark:bg-gray-900 min-h-screen`}>
      {/* Sidebar */}
      <Sidebar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

      {/* Main Content */}
      <div className="ml-64 flex-1 container bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white mx-auto p-4 rounded-md">
        <h1 className="text-2xl mb-4">Kalendarz</h1>
        <button
          onClick={() => {
            setModalOpen(true);
            setEditingEvent(null);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Dodaj zadanie
        </button>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          eventDrop={handleEventDrop}
          editable
          locales={[plLocale]}
          locale="pl"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
        />
        {modalOpen && (
          <AddScheduleItemModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onAdd={editingEvent ? handleEventEdit : handleEventAdd}
            selectedDate={selectedDate}
            editingEvent={editingEvent}
          />
        )}
      </div>
    </div>
  );
};

export default SchedulePage;