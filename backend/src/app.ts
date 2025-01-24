import express from 'express'
import cors from 'cors'
import morgan from 'morgan';

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors({origin: process.env.FRONTEND_URL, credentials: true}))

app.set('port', process.env.PORT || 5000)



export default app