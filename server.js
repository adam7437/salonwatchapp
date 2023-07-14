import express from 'express';
import { MongoClient } from 'mongodb';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

const mongoURI = 'mongodb+srv://adamh7437:password1188@salonwatch.zagpl6v.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'salonwatch';

let db;
async function createAppointmentCollection() {
  const appointmentSchema = {
    bsonType: 'object',
    required: ['name', 'date', 'time', 'notes'],
    properties: {
      name: {
        bsonType: 'string',
        description: 'Name of the appointment',
      },
      date: {
        bsonType: 'date',
        description: 'Date of the appointment',
      },
      time: {
        bsonType: 'string',
        description: 'Time of the appointment',
      },
      notes: {
        bsonType: 'array',
        description: 'Notes for the appointment',
        items: {
          bsonType: 'string',
        },
      },
    },
  };

  await db.createCollection('appointments');
  await db.command({
    collMod: 'appointments',
    validator: {
      $jsonSchema: appointmentSchema,
    },
  });
  console.log('Appointment collection created with schema validation');
}
async function connectToMongo() {
  try {
    const client = new MongoClient(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    db = client.db(dbName);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
//create an appointment
app.post('/api/appointments', async (req, res) => {
  try {
    const appointment = req.body;
    await db.collection('appointments').insertOne(appointment);
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
//read all appointments
app.get('/api/appointments', async (req, res) => {
  try {
    const appointments = await db.collection('appointments').find().toArray();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error'});
  }
  res.json(appointments);

});
 //update an appointment
 app.put('/api/appointments/:id', async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const updatedData = req.body;
    const result = await db.collection('appointments').updateOne(
      { _id: ObjectId(appointmentId) },
      { $set: updatedData }
    );
    if (result.matchedCount ===0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.json({ message: 'Appointment updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  } 
 });
//delete an appointment 
app.delete('/api/appointments/:id', async (req,res) => {
  try {
    const appointmentId = req.params.id;
    const result = await db.collection('appointments').deleteOne({ _id: ObjectId(appointmentId) });
    if (result.deleteCount ===0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(404).json({ error: 'Internal server error' });
  }
});
 
connectToMongo();



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
