import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import contactRoutes from './routes/contactRoutes';

const app = express();
app.use(cors());
app.use(json());

connect('mongodb://localhost/contactdb', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/contacts', contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));