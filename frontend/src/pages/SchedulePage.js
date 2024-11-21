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
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid"; // Poprawione importy


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
          darkMode ? "bg-blue-800" : "bg-yellow-400"
        }`}
        onClick={toggleDarkMode}
      >
        {darkMode ? (
          <>
            <MoonIcon className="w-6 h-6 text-white" />
            <span className="text-white font-semibold">Tryb ciemny</span>
          </>
        ) : (
          <>
            <SunIcon className="w-6 h-6 text-yellow-800" />
            <span className="text-yellow-800 font-semibold">Tryb jasny</span>
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
  const [modalOpen, setModalOpen] = useState(false);
import EditScheduleItemModal from '../components/EditScheduleItemModal';
import Notification from '../components/Notification';

const SchedulePage = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
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

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch schedule data on load
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
    <div className={`flex bg-gray-300 dark:bg-gray-900 min-h-screen`}>
      {/* Sidebar */}
      <Sidebar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

      {/* Main Content */}
      <div className="ml-64 flex-1 flex justify-center items-center">
        <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6 rounded-md shadow-lg max-w-full w-full">
          <h1 className="text-2xl mb-4 text-center">Kalendarz</h1>
          <button
            onClick={() => {
              setModalOpen(true);
              setEditingEvent(null);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition block mx-auto mb-4"
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
  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    setEditingEvent(null); // Reset editing
    setModalOpen(true); // Open modal for new event
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
    <div className="container bg-gray-900 text-white mx-auto p-6 rounded-md">
      <h1 className="text-2xl mb-4">Kalendarz</h1>
      <button
        onClick={() => {
          setSelectedDate(null);
          setEditingEvent(null);
          setModalOpen(true);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >
        Dodaj zadanie
      </button>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
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
  );
};

export default SchedulePage;
