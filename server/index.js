const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost', 'http://91.108.113.128', 'https://fitscript.bluebridgetechnology.co.za'], // Add your allowed origins
  credentials: true,
}))
app.use(cookieParser())

// Routers
const authenticateRouter = require('./routes/Authenticate')
app.use('/api/auth', authenticateRouter)

const userRouter = require('./routes/Users')
app.use('/api/users', userRouter)

const diagnosticJourneyRouter = require('./routes/DiagnosticJourney')
app.use('/api/diagnostic-journey', diagnosticJourneyRouter)

app.listen(3001, () => {
  console.log('server runnning on port 3001')
})