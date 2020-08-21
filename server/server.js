require('./config/config.js')

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

//Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//Parse applocaion/json
app.use(bodyParser.json())

//Configuración global de rutas
app.use(require('./routes/index'))

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