const express = require('express')
const app = express()
require('dotenv').config()
require('./src/database/database')
const cors = require('cors');
const routing = require('./src/router')
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 3000;

app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(routing)


app.listen(port)