const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routesUrls = require('./routes/routes')
const cors = require('cors')

dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS, { useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true }, () => console.log('Database connected'))

// activated bodyparser
app.use(express.json())
app.use(cors())
// routesurls will be appended to this base path (/app)
app.use(routesUrls)
app.listen(4000, () => console.log("Server is running.. "))