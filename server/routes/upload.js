const fileUpload = require('express-fileupload')
const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')

const Usuario = require('../models/usuario')
const Producto = require('../models/producto')

app.use(fileUpload())

app.put('/upload/:tipo/:id', (req, res) => {
    let tipo = req.params.tipo
    let id = req.params.id

    if(!req.files){
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se ha seleccionado ningún archivo'
            }
        })
    }

    let tiposValidos = ['productos', 'usuarios']

    if(tiposValidos.indexOf(tipo) < 0){
        return res.status(400).json({
            ok: false,
            err: {
                message: `Los tipos válidos son ${tiposValidos.join(', ')}`
            }
        })
    }
    
    let archivo = req.files.archivo
    let nombreCortado = archivo.name.split('.')
    let extension = nombreCortado[nombreCortado.length - 1]

    let extensionesValidas = ['png', 'jpg', 'jpeg', 'gif']

    if(extensionesValidas.indexOf(extension) < 0){
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Las estensiones válidas son ' + extensionesValidas.join(', '),
                extension
            }
        })
    }

    let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`

    archivo.mv( `upload/${tipo}/${nombreArchivo}`, (err) => {

        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if(tipo === 'usuarios'){
            imgUsuario(id, res, nombreArchivo)
        } else {
            imgProducto(id, res, nombreArchivo)
        }

    })
})

const imgUsuario = (id, res, nombreArchivo) => {
    Usuario.findById(id, (err, usuarioDB) => {

        if(err){
            borrarArchivo(nombreArchivo, 'usuarios')

            return res.status(500).json({
                ok: false,
                err
            })
        }

        if(!usuarioDB){
            borrarArchivo(nombreArchivo, 'usuarios')

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no existe'
                }
            })
        }

        borrarArchivo(usuarioDB.img, 'usuarios')

        usuarioDB.img = nombreArchivo
        usuarioDB.save((err, usuarioGuardado) => {
            res.json({
                ok: true,
                usuario: usuarioGuardado,
                img: nombreArchivo
            })
        })
    })
}

const imgProducto = (id, res, nombreArchivo) => {
    Producto.findById(id, (err, productoDB) => {

        if(err){
            borrarArchivo(nombreArchivo, 'productos')

            return res.status(500).json({
                ok: false,
                err
            })
        }

        if(!productoDB){
            borrarArchivo(nombreArchivo, 'productos')

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no existe'
                }
            })
        }

        borrarArchivo(productoDB.img, 'productos')

        productoDB.img = nombreArchivo
        productoDB.save((err, productoGuardado) => {
            res.json({
                ok: true,
                producto: productoGuardado,
                img: nombreArchivo
            })
        })
    })
}

const borrarArchivo = (nombreImg, tipo) => {
    let pathImg = path.resolve(__dirname, `../../upload/${tipo}/${nombreImg}`)

    if(fs.existsSync(pathImg)){
        fs.unlinkSync(pathImg)
    }
}

module.exports = app