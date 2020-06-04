const path = require('path'),
    Koa = require('koa')
    render = require('koa-art-template'),
    Router = require('koa-router'),
    koaBody = require('koa-body'),
    static = require('koa-static'),
    session = require('koa-session')

const mountDB = require('./model/index')

    // routes
const index = require('./routes/index')
const api = require('./routes/api')
const admin = require('./routes/admin')
    
const app = new Koa()
    render(app, {
        root: path.join(__dirname, 'views'),
        extname: '.html'
    })

mountDB(app)

app.use(koaBody())
// session
app.keys = ['some secret hurr']
const CONFIG = {
    key: 'koa:sess ',
    overwrite: true,
    httpOnly: true,
    signed: true,
    renew: false,
    rolling: true     // request get new session every times
}
app.use(session(CONFIG, app)) 
 
const router = new Router()
router.use(async(ctx, next)=>{      // auth
    if(ctx.url != '/admin/login' || ctx.session.userInfo) {
        ctx.redirect('/admin/login')
    }else {
        await next()
    }
})
router.use('/admin', admin)
    .use('/api', api)
    .use(index)

app.use(router.routes())
app.use(static(__dirname + '/public'))

app.listen(3000, (err)=>{
    if(err) { console.log(err) 
        return }
    console.log(`http://localhost:3000/`)
})