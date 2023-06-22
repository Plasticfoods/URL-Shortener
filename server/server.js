require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()

const apiRouter = require('./routes/api')

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use('/api/', apiRouter)

mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true, useUnifiedTopology: true
    }
)
.then(() => console.log('db connection successfull'))
.catch((err) => console.log('error in db connection', err));


app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(PORT, () => { console.log(`Server running on ${PORT}`) })