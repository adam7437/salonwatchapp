import React from 'react';
import ClientProfile from './ClientProfile.js';


const AppointmentList = ({ appointments, saveNote, deleteAppointment }) => {
  if (!appointments || appointments.length === 0) {
    return <p>No appointments scheduled.</p>;
  }
  const handleDelete = (id) => {
    deleteAppointment(id);
  };
  return (
    <div>
      <h2>Upcoming Appointments</h2>
      <ul>
        {appointments.map(appointment => (
          <li key={appointment.id}>
            <p style={{ fontSize: '36px', color: 'darkslategray' }}>Name: {appointment.name}</p>
            <p>Date: {appointment.date.toString()}</p>
            <p>Time: {appointment.time}</p>
            <ClientProfile client={appointment} saveNote={saveNote} />
            <button onClick={() => handleDelete(appointment.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;
