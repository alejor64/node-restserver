const Producto = require('../models/producto.js')
const {verificarToken} = require('../middlewares/autenticacion.js')
const _ = require('underscore')
const express = require('express')
const app = express()

app.get('/producto', verificarToken, (req, res) => {
    let desde = req.query.desde || 0
    desde = Number(desde)

    let limite = req.query.limite || 5
    limite = Number(limite)

    Producto.find({disponible: true})
        .sort('nombre')
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .skip(desde)
        .limit(limite)
        .exec((err, productos) => {
            if(err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                productos
            })
        })
})

app.get('/producto/:id', verificarToken, (req, res) => {
    let id = req.params.id

    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            if(!productoDB){
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'No se encontró el producto'
                    }
                })
            }

            res.json({
                ok: true,
                producto: productoDB
            })
    })
})

app.get('/producto/buscar/:termino', verificarToken, (req, res) => {

    let termino = req.params.termino

    let regex = new RegExp(termino, 'i')

    Producto.find({nombre: regex})
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                productos
            })
        })
})

app.post('/producto', verificarToken, (req, res) => {
    let body = req.body
    
    let producto = new Producto ({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario._id
    })

    producto.save((err, productoDB) => {
        if(err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        res.status(201).json({
            ok: true,
            producto: productoDB
        })
    })
})

app.put('/producto/:id', verificarToken, (req, res) => {
    let id = req.params.id
    let body = _.pick(req.body, ['nombre', 'precioUni', 'descripcion', 'disponible'])

    Producto.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, usuarioDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }
        
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
})

app.delete('/producto/:id', verificarToken, (req, res) => {
    let id = req.params.id

    let cambioDisponible = {
        disponible: false
    }

    Producto.findByIdAndUpdate(id, cambioDisponible, {new: true}, (err, productoBorrado)=>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if(!productoBorrado){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no encontrado'
                }
            })
        }

        res.json({
            ok: true,
            producto: productoBorrado
        })
    })
})

module.exports = app