require('./config/config.js')

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(require('./routes/usuario.js'))

mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
    }, (err, res) => {
    if(err) throw err
    console.log('Conectado a la DB')
})

app.listen(process.env.PORT, ()=>{
    console.log(`Escuchando el puerto ${process.env.PORT}`)
})