import React, { useState, useEffect } from 'react';
import AppointmentForm from './AppointmentForm.js';
import AppointmentList from './AppointmentList.js';
import ClientProfile from './ClientProfile.js';

const App = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  const addAppointment = (newAppointment) => {
    setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
  };

  const deleteAppointment = (id) => {
    const updatedAppointments = appointments.filter(appointment => appointment.id !== id);
    setAppointments(updatedAppointments);
  };

  const handleSelectClient = (client) => {
    setSelectedClient(client);
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
    // Handle the retrieved data
    console.log(data);
  })
  .catch(error => {
    console.error('Error retrieving appointments:', error);
  });
  }, 
  []);

  return (
    <div>
      <h1>SalonWatch</h1>
      <AppointmentForm addAppointment={addAppointment} />
      <AppointmentList
        appointments={appointments}
        saveNote={saveNote}
        handleSelectClient={handleSelectClient}
        deleteAppointment={deleteAppointment} // Pass the handleSelectClient function to AppointmentList
      />
      {selectedClient && (
        <ClientProfile
          client={selectedClient}
          saveNote={saveNote}
        />
      )}
    </div>
  );
};
export default App;
