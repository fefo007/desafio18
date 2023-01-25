const express = require('express')
const {Router}= require('express')
const routerProd = new Router()
const {getProducts,
    getChargeProducts,
    postChargeProducts}=require('../controllers/controllerProducts')

routerProd.use(express.json())
routerProd.use(express.urlencoded({ extended: true }))

routerProd.get('/',getProducts)
routerProd.get('/cargarProductos',getChargeProducts)

routerProd.post('/cargarProductos',postChargeProducts)

module.exports=routerProd