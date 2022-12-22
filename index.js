import * as dotenv from 'dotenv'
import './database/connectdb.js'
import express from 'express'
import authRouter from './routes/auth.route.js'

const app = express()


app.use(express.json())
app.use('/api/v1/auth', authRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('onfire!! 🔥🔥🔥 http://localhost:' + PORT))