const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cookieParser = require('cookie-parser')
const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')
const categoryRoute = require('./routes/categoryRoute')
const productRoute = require('./routes/productRoute')
const orderRoute = require('./routes/orderRoute')
require('dotenv').config()

const PORT = process.env.PORT || 5000

//middlewares
app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.use(cookieParser())


//mongoose connect
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
.then(() => app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
}))
.catch((err) => console.log(err));


//routes
app.use('/api', authRoute)
app.use('/api', userRoute)
app.use('/api', categoryRoute)
app.use('/api', productRoute)
app.use('/api', orderRoute)