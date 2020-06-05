const connection = require('mongoose')
const configUrl = `mongodb://localhost:27017/test`
const User = require('./User')

const models = {
    User
}

const mountDB = (app)=>{
    connection.connect(configUrl, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            app.context.db = connection
            app.context.models = models
            console.log(`connect mongoDB successfully!`)
        })
}

module.exports = mountDB