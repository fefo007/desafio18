const express =require('express')
const {Router}=require( 'express')
const compression = require('compression')
const session = require('express-session')
const passport = require('passport');
const {getSystemInfo,
    getLogout,
    getLoginError,
    getIndex,
    getUserInfo,
    getUserHome,
    getRegisterError,
    postPassportLogin,
    postPassportRegister,
    getRegister,
    getLoginOrHome}=require('../controllers/controllerLog')
const sessionConfig = require('../daos/sessionConectMongo')
const routerLog=new Router()


routerLog.use(session(sessionConfig))

routerLog.use(passport.initialize());
routerLog.use(passport.session());

routerLog.use(express.json())
routerLog.use(express.urlencoded({ extended: true }))


routerLog.get('/',getLoginOrHome)

routerLog.get('/register',getRegister)

routerLog.post('/register',postPassportRegister)

routerLog.post('/login', postPassportLogin)

routerLog.get('/registerError',getRegisterError)

routerLog.get('/home',getUserHome)

routerLog.get('/info',getUserInfo)

routerLog.get('/login',getIndex)

routerLog.get('/loginError',getLoginError)

routerLog.get("/logout", getLogout);

// COMPRIMIR LA RUTA INFO
routerLog.get('/sistemInfo',compression(),getSystemInfo)
// SIN COMPRIMIR
// routerLog.get('/info',(req,res)=>{
//     let inf = info
//     res.render('info',inf)
// })


module.exports=routerLog