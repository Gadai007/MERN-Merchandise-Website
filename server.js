const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

const PORT = process.env.PORT || 5000


//mongoose connect
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
.then(() => app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
}))
.catch((err) => console.log(err));
