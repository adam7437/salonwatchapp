import React, { useState } from 'react';

const AppointmentForm = ({ addAppointment }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!name || !date || !time) {
      alert('Please fill in all fields');
      return;
    }

    const formattedDate = new Date(`${date}T${time}`);
    const formattedDateTime = formattedDate.toISOString().slice(0, 16);


    const newAppointment = {
      name,
      date: formattedDateTime,
      notes: [],
    };

    addAppointment(newAppointment);

    // Reset form fields
    setName('');
    setDate('');
    setTime('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h5>Schedule an Appointment:</h5>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
     <input
        type="date"
        placeholder="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="time"
        placeholder="Time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <button type="submit">Book Appointment</button>
    </form>
  );
};

export default AppointmentForm;