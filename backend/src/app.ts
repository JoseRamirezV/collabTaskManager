import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

import taskRoutes from '#routes/task.routes';
import userRoutes from '#routes/user.routes';

dotenv.config()

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors({origin: process.env.FRONTEND_URL, credentials: true}))

app.set('port', process.env.PORT || 5000)

app.use('/api/task/', taskRoutes)
app.use('/api/user/', userRoutes)

export default app