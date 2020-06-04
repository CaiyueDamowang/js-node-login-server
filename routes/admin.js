const Router = require('koa-router')
const router = new Router()

const login = require('./admin/login')
const user = require('./admin/user')

router.use(async(ctx, next) => {
    const host = ctx.request.header.host
    ctx.state.__HOST__ = `http://${host}`
    await next()
})

router.use('/login', login)
router.use('/user', user)
router.get('/', async(ctx) => {
    ctx.body = 'admin'
})
module.exports = router.routes()
