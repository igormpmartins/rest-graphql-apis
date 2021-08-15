const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes/index')
const graphqlServer = require('./graphql')

const app = express()
const port = 3000

app.use(bodyParser.json({extended: true}))
app.use(routes)

graphqlServer.applyMiddleware({app})

app.listen(port, async(err) => {
    if (err) {
        console.log('could not start server on port', port)
    } else {
        //await graphqlServer.start()
        //graphqlServer.applyMiddleware({app})
        console.log('server listening on port', port)
    }
})
