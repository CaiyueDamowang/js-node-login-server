const Router = require('koa-router')
const router = new Router()

router.get('/', async(ctx) => {
    ctx.render('/admin/user/index')
})
router.get('/login', async(ctx)=>{
    ctx.render('/admin/login')
})

router.get('/add', async(ctx) => {
    ctx.body = 'add user'
})
router.get('/edit', async(ctx) => {
    ctx.body = 'edit user'
})
router.get('/delete', async(ctx) => {
    ctx.body = 'delete user'
})



module.exports = router.routes()
