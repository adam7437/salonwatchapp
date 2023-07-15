import React from 'react';
import ClientProfile from './ClientProfile.js';

const AppointmentList = ({ appointments, saveNote }) => {
  if (!appointments || appointments.length === 0) {
    return <p>No appointments scheduled.</p>;
  }

  return (
    <div>
      <h2>Appointments</h2>
        <ul>
          {appointments.map((appointment, index) => (
            <li key={index}>
              <strong>Name:</strong> {appointment.name} | <strong>Date:</strong> {appointment.date} | <strong>Time:</strong> {appointment.time}
              <ClientProfile client={appointment} saveNote={saveNote} />
            </li>
          ))}
        </ul>
    </div>
  );
};

export default AppointmentList;
