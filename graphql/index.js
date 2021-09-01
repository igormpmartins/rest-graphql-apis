const {ApolloServer, gql} = require('apollo-server-express')
const resolvers = require('./resolvers')
const auth = require('../controllers/auth')

const fs = require('fs')
const path = require('path')

const schema = fs.readFileSync(path.join(__dirname, 'schema.graphql'))

const typeDefs = gql`${schema}`

const graphqlServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
        return auth.checkAuthGraphQL(req)
    }
})

module.exports = graphqlServer