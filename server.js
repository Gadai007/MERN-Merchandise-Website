const express = require('express')
const mongoose = require('mongoose')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')
const categoryRoute = require('./routes/categoryRoute')
const productRoute = require('./routes/productRoute')
const orderRoute = require('./routes/orderRoute')
const paymentRoute = require('./routes/paymentRoute')
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

//deployment

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});


//routes
app.use('/api', authRoute)
app.use('/api', userRoute)
app.use('/api', categoryRoute)
app.use('/api', productRoute)
app.use('/api', orderRoute)
app.use('/api', paymentRoute)