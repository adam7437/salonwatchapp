import React, { useState, useEffect } from 'react';
import AppointmentForm from './AppointmentForm.js';
import AppointmentList from './AppointmentList.js';

const App = () => {
  const [appointments, setAppointments] = useState([]);

  const addAppointment = (newAppointment) => {
    fetch('/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAppointment),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add appointment');
        }
        return response.json();
      })
      .then((data) => {
        setAppointments((prevAppointments) => [...prevAppointments, data]);
      })
      .catch((error) => {
        console.error('Error adding appointment:', error);
      });
  };

  const deleteAppointment = (id) => {
    fetch(`/api/appointments/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete appointment');
        }
        return response.json();
      })
      .then((data) => {
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.id !== id)
        );
      })
      .catch((error) => {
        console.error('Error deleting appointment:', error);
      });
  };

  const updateAppointment = (id, updatedData) => {
    fetch(`/api/appointments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update appointment');
        }
        return response.json();
      })
      .then((data) => {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.id === id ? { ...appointment, ...data } : appointment
          )
        );
      })
      .catch((error) => {
        console.error('Error updating appointment:', error);
      });
  };

  const saveNote = (clientId, note) => {
    const updatedAppointments = appointments.map((appointment) => {
      if (appointment.id === clientId) {
        return {
          ...appointment,
          notes: [...appointment.notes, note],
        };
      }
      return appointment;
    });

    setAppointments(updatedAppointments);
  };

  useEffect(() => {
    fetch('/api/appointments')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then((data) => {
        setAppointments(data);
      })
      .catch((error) => {
        console.error('Error retrieving appointments:', error);
      });
  }, []);

  return (
    <div>
      <h1>SalonWatch</h1>
      <AppointmentForm addAppointment={addAppointment} />
      <AppointmentList
        appointments={appointments}
        saveNote={saveNote}
        deleteAppointment={deleteAppointment}
        updateAppointment={updateAppointment}
      />
    </div>
  );
};

export default App;
