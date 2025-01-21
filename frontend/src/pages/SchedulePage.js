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
import EditScheduleItemModal from '../components/EditScheduleItemModal';
import Notification from '../components/Notification';
import { useNavigate } from 'react-router-dom';
import { SunIcon, MoonIcon, ClockIcon } from '@heroicons/react/24/solid'; // <-- Dodajemy ClockIcon
import { Link } from 'react-router-dom';

// import scheduleLogo from '../assets/scheduleLogo.png';  // <-- Usuwamy lub komentujemy (nie jest już potrzebne)

const Sidebar = ({ toggleDarkMode, darkMode }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="h-screen w-64 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 fixed top-0 left-0 flex flex-col items-center py-8 border-r border-gray-300 dark:border-gray-700 shadow-md">
      
      {/* Duża ikona zegara + tekst "ScheduleApp" */}
      <div className="mb-10 text-center">
        <ClockIcon className="w-16 h-16 mx-auto mb-2 text-blue-600 dark:text-blue-300" />
        <h1 className="text-2xl font-bold tracking-wide">Zarządzaj czasem</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Zarządzaj zadaniami
        </p>
      </div>

      {/* Link do ustawień */}
      <Link
        to="/settings"
        className="mb-6 w-40 text-center px-4 py-2 bg-gray-200 dark:bg-gray-700
                   rounded-md hover:bg-gray-300 dark:hover:bg-gray-600
                   transition-colors duration-300 shadow-sm"
      >
        Ustawienia
      </Link>

      <div className="flex-1"></div>

      {/* Przycisk – tryb ciemny/jasny */}
      <div
        className={`flex items-center justify-between w-40 px-4 py-2 mb-4 rounded-full cursor-pointer transition-colors duration-300 ${
          darkMode ? 'bg-yellow-400' : 'bg-blue-700'
        }`}
        onClick={toggleDarkMode}
      >
        {darkMode ? (
          <>
            <MoonIcon className="w-5 h-5 text-yellow-900 mr-2" />
            <span className="text-yellow-900 font-semibold">Tryb jasny</span>
          </>
        ) : (
          <>
            <SunIcon className="w-5 h-5 text-white mr-2" />
            <span className="text-white font-semibold">Tryb ciemny</span>
          </>
        )}
      </div>

      {/* Wylogowanie */}
      <button
        onClick={handleLogout}
        className="w-40 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors shadow-sm"
      >
        Wyloguj
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
    localStorage.getItem('darkMode') === 'true'
  );

  // Obsługa trybu ciemnego
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Pobranie eventów
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
      startTime: startStr,
      endDate: endStr.split('T')[0],
      endTime: endStr,
      description: extendedProps.description,
      type: extendedProps.type,
      location: extendedProps.location,
      priority: extendedProps.priority,
    });
    setModalOpen(true);
  };

  // Dodawanie eventu
  const handleEventAdd = async (eventData) => {
    try {
      const newEvent = await addScheduleItem(eventData);
      const eventForCalendar = {
        id: newEvent.id,
        title: newEvent.title,
        start: newEvent.startTime,
        end: newEvent.endTime,
        extendedProps: {
          description: newEvent.description,
          type: newEvent.type,
          location: newEvent.location,
          priority: newEvent.priority,
        },
        display: 'auto',
      };

      setEvents([...events, eventForCalendar]);
      setModalOpen(false);
      setSuccessMessage('Dodano zadanie do kalendarza!');
      fetchEvents(); // Odświeżenie
    } catch (error) {
      setErrorMessage('Błąd podczas dodawania zadania do kalendarza.');
      console.error('Error adding event:', error);
    }
  };

  // Edycja eventu
  const handleEventEdit = async (updatedData) => {
    try {
      const updatedEvent = await updateScheduleItem(editingEvent.id, updatedData);
      setEvents((prev) =>
        prev.map((ev) => (ev.id === editingEvent.id ? updatedEvent : ev))
      );
      setModalOpen(false);
      fetchEvents();
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  // Usuwanie eventu
  const handleEventDelete = async (id) => {
    try {
      await deleteScheduleItem(id);
      setEvents((prev) => prev.filter((ev) => ev.id !== id));
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  // DRAG & DROP przenoszenie
  const handleEventDrop = async (info) => {
    try {
      const event = info.event;
      const updatedData = {
        title: event.title,
        description: event.extendedProps.description,
        location: event.extendedProps.location,
        type: event.extendedProps.type,
        priority: event.extendedProps.priority,
        startTime: event.start.toISOString(),
        endTime: event.end ? event.end.toISOString() : event.start.toISOString(),
      };
      await updateScheduleItem(event.id, updatedData);
      fetchEvents();
      setSuccessMessage('Zadanie zostało przeniesione.');
    } catch (error) {
      console.error('Error dragging event:', error);
      setErrorMessage('Nie udało się zaktualizować zadania.');
      info.revert();
    }
  };

  // DRAG & DROP zmiana rozmiaru
  const handleEventResize = async (info) => {
    try {
      const event = info.event;
      const updatedData = {
        title: event.title,
        description: event.extendedProps.description,
        location: event.extendedProps.location,
        type: event.extendedProps.type,
        priority: event.extendedProps.priority,
        startTime: event.start.toISOString(),
        endTime: event.end ? event.end.toISOString() : event.start.toISOString(),
      };
      await updateScheduleItem(event.id, updatedData);
      fetchEvents();
      setSuccessMessage('Zadanie zostało zmienione (rozmiar).');
    } catch (error) {
      console.error('Error resizing event:', error);
      setErrorMessage('Nie udało się zaktualizować zadania.');
      info.revert();
    }
  };

  return (
    <div className="flex bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      {/* Sidebar */}
      <Sidebar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

      {/* Główna zawartość */}
      <div className="ml-64 flex-1 container mx-auto py-8 px-6">
        {/* Nagłówek i przycisk dodawania */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 sm:mb-0">
            Kalendarz
          </h1>
          <button
            onClick={() => {
              setSelectedDate(null);
              setEditingEvent(null);
              setModalOpen(true);
            }}
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                       active:scale-95"
          >
            Dodaj zadanie
          </button>
        </div>

        {/* Notyfikacje */}
        <Notification
          message={errorMessage}
          type="error"
          show={!!errorMessage}
          onClose={() => setErrorMessage('')}
        />
        <Notification
          message={successMessage}
          type="success"
          show={!!successMessage}
          onClose={() => setSuccessMessage('')}
        />

        {/* Karta z kalendarzem */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events.map((event) => ({
              ...event,
              backgroundColor:
                event.extendedProps.priority === 'high'
                  ? '#f87171' // czerwień (Tailwind: red-400)
                  : event.extendedProps.priority === 'medium'
                  ? '#facc15' // żółty (Tailwind: yellow-400)
                  : '#86efac', // zielony (Tailwind: green-300)
              borderColor: '#999999',
            }))}
            eventTimeFormat={{
              hour: '2-digit',
              minute: '2-digit',
              meridiem: false,
            }}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            locales={[plLocale]}
            locale="pl"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            // DRAG & DROP
            editable={true}
            eventResizableFromStart={true}
            droppable={true}
            eventDrop={handleEventDrop}
            eventResize={handleEventResize}
          />
        </div>

        {/* Modal (dodawanie / edycja) */}
        {modalOpen &&
          (editingEvent ? (
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
          ))}
      </div>
    </div>
  );
};

export default SchedulePage;
