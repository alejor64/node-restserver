require('./config/config.js')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json('Hello')
})

app.get('/usuarios', (req, res) => {
    res.json('get Usuario')
})

app.post('/usuarios', (req, res) => {
    let body = req.body
    if(body.nombre === undefined){
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        })
    }
    res.json({
        persona: body
    })
})

app.put('/usuarios/:id', (req, res) => {
    let id = req.params.id
    res.json({
        id
    })
})

app.delete('/usuarios', (req, res) => {
    res.json('delete Usuario')
})

app.listen(process.env.PORT, ()=>{
    console.log(`Escuchando el puerto ${process.env.PORT}`)
})