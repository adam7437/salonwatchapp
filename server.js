import express from 'express';
import { MongoClient } from 'mongodb';
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

const mongoURI = 'mongodb+srv://adamh7437:password1188@salonwatch.zagpl6v.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'salonwatch';

let db;

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

connectToMongo();

// Configure middleware to parse JSON data & serve static files
app.use(express.json());

app.use(express.static(join(__dirname, 'public')));

// Define API routes
app.get('/api/appointments', async (req, res) => {
  try {
    const appointments = await db.collection('appointments').find().toArray();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/appointments', async (req, res) => {
  try {
    const appointment = req.body;
    await db.collection('appointments').insertOne(appointment);
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/client-profiles', async (req, res) => {
  try {
    const clientProfiles = await db.collection('clientProfiles').find().toArray();
    res.json(clientProfiles);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/client-profiles', async (req, res) => {
  try {
    const clientProfile = req.body;
    await db.collection('clientProfiles').insertOne(clientProfile);
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

