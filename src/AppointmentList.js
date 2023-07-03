import React from 'react';
import ClientProfile from './ClientProfile.js';
import appointmentsData from './appointmentsData.js';

const AppointmentList = ({ appointments, saveNote }) => {
  if (!appointments || appointments.length === 0) {
    return <p>No appointments scheduled.</p>;
  }

  return (
    <div>
      <h2>Upcoming Appointments</h2>
        <ul>
          {appointmentsData.map(appointment => (
          <li key={appointment.id}>
            <p>Name: {appointment.name}</p>
            <p>Date: {appointment.date.toString()}</p>
            <p>Time: {appointment.time}</p>
            <ClientProfile client={appointment} saveNote={saveNote} />
            </li>
          ))}
        </ul>
    </div>
  );
};

export default AppointmentList;