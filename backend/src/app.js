import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import taskRoutes from '#routes/task.routes.js';
import userRoutes from '#routes/user.routes.js';

const app = express()

app.options("*", cors()); // Enable preflight for all routes
app.use(cors({origin: process.env.FRONTEND_URL}))
app.use(morgan('dev'))
app.use(express.json())

app.set('port', process.env.PORT || 5000)

app.use('/api/task/', taskRoutes)
app.use('/api/user/', userRoutes)
app.get('/', (_, res) => res.send("Welcome to TeamFlow API "+process.env.FRONTEND_URL))

export default app