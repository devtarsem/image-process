const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')

const app = express();
app.use(bodyparser.json());

app.use(express.json())
app.use(cors())


module.exports = app