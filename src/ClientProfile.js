import React, { useState } from 'react';

const ClientProfile = ({ client, saveNote, cancelEdit, updateAppointment }) => {
  const [note, setNote] = useState('');
  const [updatedDate, setUpdatedDate] = useState(client.date);
  const [updatedTime, setUpdatedTime] = useState(client.time);

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleNoteSave = () => {
    if (note.trim() === '') {
      alert('Please enter a note');
      return;
    }

    saveNote(client.id, note);
    setNote('');
  };

  const handleUpdateAppointment = () => {
    const updatedAppointment = {
      ...client,
      date: updatedDate,
      time: updatedTime,
    };

    updateAppointment(client.id, updatedAppointment);
    cancelEdit();
  };

  return (
    <div>
      <textarea value={note} onChange={handleNoteChange} />
      <button onClick={handleNoteSave}>Save Note</button>

      <h4>Notes:</h4>
      {client.notes.map((note, index) => (
        <p key={index}>{note}</p>
      ))}

      <h4>Edit Appointment:</h4>
      <input
        type="date"
        value={updatedDate}
        onChange={(e) => setUpdatedDate(e.target.value)}
      />
      <input
        type="time"
        value={updatedTime}
        onChange={(e) => setUpdatedTime(e.target.value)}
      />
      <button onClick={handleUpdateAppointment}>Save</button>
    </div>
  );
};

export default ClientProfile;
