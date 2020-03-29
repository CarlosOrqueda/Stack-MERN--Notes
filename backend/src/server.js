import express from 'express';
import cors from "cors";

import usersRoutes from './routes/users.routes';
import notesRoutes from './routes/notes.routes';

// Initialization
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/notes', notesRoutes);

module.exports = app;