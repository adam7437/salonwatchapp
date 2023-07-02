import React, { useState } from 'react';


const ClientProfile = ({ client, saveNote }) => {
  const [note, setNote] = useState('');

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

  return (
    <div>
      
      <textarea value={note} onChange={handleNoteChange} />
      <button onClick={handleNoteSave}>Save Note</button>
      
      <h4>Notes:</h4>
      {client.notes.map((note, index) => (
        <p key={index}>{note}</p>
      ))}
    </div>
  );
};

export default ClientProfile;
