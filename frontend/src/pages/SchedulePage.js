import React, { useState, useEffect } from 'react';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // widok miesiąca
import timeGridPlugin from '@fullcalendar/timegrid'; // widok tygodnia/dnia
import interactionPlugin from '@fullcalendar/interaction'; // interakcje (kliknięcie, przeciąganie)
import plLocale from '@fullcalendar/core/locales/pl'; // język polski
import { getSchedule, addScheduleItem } from '../services/scheduleService';
import AddScheduleItemModal from '../components/AddScheduleItemModal';
import axios from 'axios';

function SchedulePage() {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getSchedule();
      // Mapowanie danych na format wymagany przez FullCalendar
      const events = data.map((item) => ({
        id: item.id,
        title: item.title,
        start: item.startTime,
        end: item.endTime,
        extendedProps: {
          description: item.description,
        },
      }));
      setEvents(events);
    } catch (error) {
      console.error(error);
    }
  };


  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    setModalOpen(true);
  };

  const [editingEvent, setEditingEvent] = useState(null);

const handleEventClick = (clickInfo) => {
  setEditingEvent(clickInfo.event);
};


  const handleEventAdd = async (eventData) => {
    try {
      const newItem = await addScheduleItem(eventData);
      setEvents([...events, {
        id: newItem.id,
        title: newItem.title,
        start: newItem.startTime,
        end: newItem.endTime,
        extendedProps: {
          description: newItem.description,
        },
      }]);
      setModalOpen(false);
    } catch (error) {
      console.error(error);
      alert('Nie udało się dodać zadania.');
    }
  };

  const handleEventDrop = async (info) => {
    try {
      const updatedEvent = {
        id: info.event.id,
        startTime: info.event.start,
        endTime: info.event.end,
        // Dodaj inne potrzebne pola
      };
      await updateScheduleItem(info.event.id, updatedEvent);
      // Zaktualizuj stan wydarzeń
    } catch (error) {
      console.error(error);
      // Cofnij zmiany w kalendarzu
      info.revert();
    }
  };

  const updateScheduleItem = async (id, item) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/${id}`, item, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // Zaktualizuj stan wydarzeń
      const updatedEvents = events.map((event) => {
        if (event.id === id) {
          return {
            id: response.data.id,
            title: response.data.title,
            start: response.data.startTime,
            end: response.data.endTime,
            extendedProps: {
              description: response.data.description,
            },
          };
        }
        return event;
      });
      setEvents(updatedEvents);
    } catch (error) {
      console.error(error);
      alert('Nie udało się zaktualizować zadania.');
    }
  };

  return (
    <div className="container bg-gray-600 mx-auto p-4">
      <h1 className="text-2xl mb-4">Twój Kalendarz</h1>
      <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
          Dodaj zadanie
      </button>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        editable={true}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
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
          onAdd={handleEventAdd}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
}

export default SchedulePage;
