import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());

// Base route
app.get("/", (req, res) => {
    res.send("API is running");
});

// API routes
app.use('/api', routes);

export default app;
