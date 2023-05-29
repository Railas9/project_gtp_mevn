const express = require('express')
const app = express()
require('./src/database/database')
const cors = require('cors');
const routing = require('./src/router')
const cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(routing)


app.listen(8000)