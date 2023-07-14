import React, { useState, useEffect } from 'react';
import AppointmentForm from './AppointmentForm.js';
import AppointmentList from './AppointmentList.js';


const App = () => {
  const [appointments, setAppointments] = useState([]);
 
  
  const addAppointment = (newAppointment) => {
    setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
  };

  const deleteAppointment = (id) => {
    const updatedAppointments = appointments.filter(appointment => appointment.id !== id);
    setAppointments(updatedAppointments);
  };

  const updateAppointment = (id, updatedData) => {
    // Implement the updateAppointment logic here
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
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then(data => {
        console.log('Appointments data:', data);
      })
      .catch(error => {
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