const express = require('express')
const {Router}= require('express')
const routerCart= new Router()
const {getCart,
    deleteCart,
    getCartProducts,
    postCartProducts,
    deleteCartProducts}=require('../controllers/controllerCart')


routerCart.use(express.json())
routerCart.use(express.urlencoded({ extended: true }))

routerCart.get('/',getCart)

// routerCart.post('/',(req,res)=>{
//     let carritoCreado = JSON.stringify(apiCart.createCart())
//     res.json(`carrito creado con exito, su id es : ${carritoCreado}`)
// })

routerCart.delete('/:id',deleteCart)

routerCart.get('/:id/productos',getCartProducts)

routerCart.post('/:id/productos/:id_prod',postCartProducts)

routerCart.delete('/:id/productos/:id_prod',deleteCartProducts)


module.exports=routerCart