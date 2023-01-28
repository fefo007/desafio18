const passport = require('passport');
const info = require('../service/info')
const logger = require('../loggers/loggersLog4js')
// const getUser = require('../service/serviceLog')
const { Strategy: LocalStrategy } = require('passport-local');
const {passportRegisterConfig,
    passportLoginConfig,
    passportSerializerConfig,
    passportDesserializerConfig}=require('../service/passportConfig')



// -------------------------PASSPORT---------------------------
passport.use('register', new LocalStrategy({passReqToCallback: true}, passportRegisterConfig));

passport.use('login', new LocalStrategy(passportLoginConfig));

passport.serializeUser(passportSerializerConfig);

passport.deserializeUser(passportDesserializerConfig);
// -------------------------/PASSPORT---------------------------

const getLoginOrHome = async (req,res)=>{
    if (req.isAuthenticated()) {
        res.redirect('/user/home')
    } else {
        res.redirect("/user/login");
    }
}

const getRegister = async (req,res)=>{
    res.render('register')
}

const postPassportRegister = passport.authenticate('register', { failureRedirect: '/user/registerError', successRedirect: '/user/login' })

const postPassportLogin = passport.authenticate('login', { failureRedirect: '/user/loginError', successRedirect: '/user/home' })

const getRegisterError = async (req,res)=>{0
    logger.error('error de registro')
    res.render('registerError')
}

const getUserHome =async (req,res)=>{
    // let user = await usuarios.find(usuario => usuario.username == req.user.username)
    const user =await mongoDbUserContainer.getUser(req.uer.username)
    res.render('userHome',{user})
}

const getUserInfo = async (req,res)=>{
    // let user = await usuarios.find(usuario => usuario.username == req.user.username)
    const user =mongoDbUserContainer.getUser(req.user.username)
    res.render('userInfo',{user})
}

const getIndex = async (req,res)=>{
    res.render('index')
}

const getLoginError = async (req,res)=>{
    logger.error('error de logeo')
    res.render('loginError')
}

const getLogout = async (req, res,next) => {
    req.logout(req.user, err => {
        if(err) return next(err);
        res.redirect("/user/login");
    });
}

const getSystemInfo = async (req,res)=>{
    let inf = info
    res.render('info',inf)
}

module.exports={getSystemInfo,
    getLogout,
    getLoginError,
    getIndex,
    getUserInfo,
    getUserHome,
    getRegisterError,
    postPassportLogin,
    postPassportRegister,
    getRegister,
    getLoginOrHome}