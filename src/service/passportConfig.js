const sendMail=require('../sendNotifications/sendEmail')
const {newUserEmail}=require('../sendNotifications/emailTemplates')
const bCrypt = require('bcrypt')
const {getUser,saveUser} = require('./serviceLog')
// const usuarios=[]

const passportRegisterConfig=(req, username, password, done) => {

    const { direccion,residencia,edad,celular,formfile } = req.body
    // const usuario = usuarios.find(usuario => usuario.username == username)
    // BASE DE DATOS--------- 
    const usuario = getUser(username)

    if (usuario) {
    return done('usuario ya existente')
    }

    const user = {
        username:username,
        password:bCrypt.hashSync(password,bCrypt.genSaltSync(10),null),
        direccion:direccion,
        residencia:residencia,
        edad:edad,
        celular:celular,
        formfile:formfile,
    }
    // usuarios.push(user)
    const newuser=newUserEmail(user)
    sendMail('nuevo usuario',newuser)
    // BASE DE DATOS--------- 
    // 
    saveUser(user)
    return done(null, user)
}

function isValidPass(user,password){
    return bCrypt.compareSync(password,user.password)
}

const passportLoginConfig=(username, password, done) => {

    // const user = usuarios.find(usuario => usuario.username == username)
    // BASE DE DATOS--------- 
    const user = getUser(username)
    if (!user) {
        return done(null, false)
    }

    if (!isValidPass(user,password)) {
        return done(null, false)
    }

    user.contador = 0
    return done(null, user);
}


const passportSerializerConfig=function (user, done) {
    done(null, user.username);
}

const passportDesserializerConfig=function (username, done) {
    // const usuario = usuarios.find(usuario => usuario.username == username)
    // BASE DE DATOS--------- 
    const usuario = getUser(username)
    done(null, usuario);
}

module.exports={passportRegisterConfig,
    passportLoginConfig,
    passportSerializerConfig,
    passportDesserializerConfig}