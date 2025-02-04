import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import taskRoutes from '#routes/task.routes.js';
import userRoutes from '#routes/user.routes.js';

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors({origin: process.env.FRONTEND_URL, credentials: true}))

app.set('port', process.env.PORT || 5000)

app.use('/api/task/', taskRoutes)
app.use('/api/user/', userRoutes)

export default app