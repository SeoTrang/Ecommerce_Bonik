
// const client = require('./client');
const admin = require('./admin');
const client = require('./client');
const file = require('./file');
const auth = require('./auth');
const authMiddleware = require('../middleware/authMiddleware');

const route = (app) => {
    
    // app.use('/',client)
    app.use('/',client)
    app.use('/admin',authMiddleware.checkLogin,authMiddleware.checkAdmin,admin)
    app.use('/file',file)
    app.use('/auth',auth)
}

module.exports = route;