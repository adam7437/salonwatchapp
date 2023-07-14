import express from 'express';
import mongoose, { Schema } from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Connect to MongoDB
mongoose.connect('mongodb+srv://adam7437:Ch10331iz%4083th@cluster0.ulqcv8h.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Configure middleware to parse JSON data & serve static files
app.use(express.json());

app.use(express.static(join(__dirname, 'public')));

// schema for the client profile
const clientProfileSchema = new Schema({
  name: String,
  phone: String,
  email: String,
  notes: String,
});

// model for the client profile
const ClientProfile = mongoose.model('ClientProfile', clientProfileSchema);

// Define the schema for your MongoDB collection
const appointmentSchema = new Schema({
  name: String,
  date: Date,
  time: String,
});

// model for MongoDB collection
const Appointment = mongoose.model('Appointment', appointmentSchema);

// Define API routes
app.get('/api/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/appointments', async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API client profiles
app.get('/api/client-profiles', async (req, res) => {
  try {
    const clientProfiles = await ClientProfile.find();
    res.json(clientProfiles);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/client-profiles', async (req, res) => {
  try {
    const clientProfile = new ClientProfile(req.body);
    await clientProfile.save();
    res.status(201).json(clientProfile);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
