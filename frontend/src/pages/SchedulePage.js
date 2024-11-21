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

const SchedulePage = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
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
  };

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


