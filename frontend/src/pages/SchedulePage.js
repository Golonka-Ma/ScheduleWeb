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

const SchedulePage = () => {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  // Fetch events on mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getSchedule();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
  };

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    setEditingEvent(null); // Ensure we're not editing
    setModalOpen(true);
  };

  const handleEventAdd = async (eventData) => {
    try {
      const newEvent = await addScheduleItem({
        ...eventData,
        startTime: selectedDate + 'T' + eventData.startTime,
        endTime: selectedDate + 'T' + eventData.endTime,
      });
      setEvents([...events, newEvent]);
      setModalOpen(false);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleEventClick = (clickInfo) => {
    const { id, title, startStr, endStr, extendedProps } = clickInfo.event;
    setEditingEvent({
      id,
      title,
      startTime: startStr.split('T')[1],
      endTime: endStr.split('T')[1],
      description: extendedProps.description,
      type: extendedProps.type,
      location: extendedProps.location,
    });
    setSelectedDate(startStr.split('T')[0]); // Extract date
    setModalOpen(true);
  };

  const handleEventEdit = async (updatedData) => {
    try {
      const updatedEvent = await updateScheduleItem(editingEvent.id, updatedData);
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === editingEvent.id ? { ...event, ...updatedEvent } : event
        )
      );
      setModalOpen(false);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleEventDelete = async (id) => {
    try {
      await deleteScheduleItem(id);
      setEvents(events.filter((event) => event.id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleEventDrop = async (info) => {
    try {
      const updatedEvent = {
        startTime: info.event.start.toISOString(),
        endTime: info.event.end.toISOString(),
      };
      await updateScheduleItem(info.event.id, updatedEvent);
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === info.event.id ? { ...event, ...updatedEvent } : event
        )
      );
    } catch (error) {
      console.error('Error updating event position:', error);
      info.revert(); // Revert the drop if update fails
    }
  };

  return (
    <div className="container bg-gray-800 text-white mx-auto p-4 rounded-md">
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
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
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
  );
};

export default SchedulePage;
