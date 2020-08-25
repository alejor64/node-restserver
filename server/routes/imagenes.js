const fs = require('fs')
const path = require('path')
const {verificaTokenImg} = require('../middlewares/autenticacion')
const express = require('express')

const app = express()

app.get('/imagen/:tipo/:img', verificaTokenImg, (req, res) => {
    let tipo = req.params.tipo
    let img = req.params.img

    let pathImagen = path.resolve(__dirname, `../../upload/${tipo}/${img}`)

    if(fs.existsSync(pathImagen)){
        res.sendFile(pathImagen)
    }else {
        let noImagePath = path.resolve(__dirname, '../assets/no-image.jpg')
    
        res.sendFile(noImagePath)
    }

})

module.exports = app