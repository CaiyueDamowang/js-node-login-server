const Router = require('koa-router')
const router = new Router()
const tools = require('../../util/tools')
const db = require('../../model/index')

router.get('/', async(ctx) => {
    await ctx.render('admin/login')
})

router.post('/', async(ctx) => {
    const { username, password } = ctx.request.body
    const person = { username, password }
    const hasUser = await findUser(person)
    if(hasUser) {
        ctx.session.userInfo =  hasUser
        ctx.redirect(ctx.state.__HOST__ + '/admin')
    } else {
        const User = ctx.models.User
        const newUser = new User(person)
        await newUser.save()
        const user = await findUser(person)
        ctx.session.userInfo = user
        ctx.redirect('/')
    }

    function findUser(obj) {
        return ctx.models.User.findOne(obj)
    }
})

module.exports = router.routes()
