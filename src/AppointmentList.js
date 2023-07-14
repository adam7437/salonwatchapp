import React, { useState } from 'react';
import ClientProfile from './ClientProfile.js';

const AppointmentList = ({ appointments, saveNote, deleteAppointment, updateAppointment }) => {
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [updatedDate, setUpdatedDate] = useState('');
  const [updatedTime, setUpdatedTime] = useState('');

  if (!appointments || appointments.length === 0) {
    return <p>No appointments scheduled.</p>;
  }

  const handleDelete = (id) => {
    deleteAppointment(id);
  };

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    setUpdatedDate(appointment.date);
    setUpdatedTime(appointment.time);
  };

  const handleCancelEdit = () => {
    setEditingAppointment(null);
    setUpdatedDate('');
    setUpdatedTime('');
  };

  const handleSaveNote = (clientId, note) => {
    saveNote(clientId, note);
    setEditingAppointment(null);
    setUpdatedDate('');
    setUpdatedTime('');
  };

  const handleUpdateAppointment = (appointment) => {
    updateAppointment(appointment);
    setEditingAppointment(null);
    setUpdatedDate('');
    setUpdatedTime('');
  };

  return (
    <div>
      <h2>Upcoming Appointments</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            <p style={{ fontSize: '36px', color: 'darkslategray' }}>Name: {appointment.name}</p>
            {editingAppointment === appointment ? (
              <>
                <p>Date: <input type="text" value={updatedDate} onChange={(e) => setUpdatedDate(e.target.value)} /></p>
                <p>Time: <input type="text" value={updatedTime} onChange={(e) => setUpdatedTime(e.target.value)} /></p>
                <ClientProfile
                  client={appointment}
                  saveNote={handleSaveNote}
                  cancelEdit={handleCancelEdit}
                  updateAppointment={updateAppointment}
                />
                <button onClick={() => handleUpdateAppointment({ ...appointment, date: updatedDate, time: updatedTime })}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <p>Date: {appointment.date.toString()}</p>
                <p>Time: {appointment.time}</p>
                <ClientProfile client={appointment} handleSaveNote={saveNote} />
                <button onClick={() => handleEdit(appointment)}>Edit</button>
              </>
            )}
            <button onClick={() => handleDelete(appointment.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;

