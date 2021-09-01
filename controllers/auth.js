const jwt = require('jsonwebtoken')

const SECRET = '123459789teste'

const USERS = {
    'igor.martins': 'teste123'
}

const auth = async(req, res) => {

    const {user, passwd} = req.body

    if (USERS[user] && USERS[user] === passwd) {

        const token = jwt.sign({
            user
        }, SECRET, {expiresIn: '1 days'})

        return res.send({
            success: true,
            token
        })

    }

    return res.send({
        success: false,
        message: 'wrong credentials'
    })

}

const checkAuth = async(req, res, next) => {
    console.log('middleware')

    if (req.headers && req.headers.authorization) {
        const header = req.headers.authorization
        const hdParts = header.split(' ')
        let chkToken = ''
        
        if (hdParts.length > 1) {
            chkToken = hdParts[1]
        }

        try {
            const payload = jwt.verify(chkToken, SECRET)
            res.locals.user = payload.user
            return next()
        } catch (e) {
            console.log('could not auth', e)
        }

    }
    
    return res.send({
        success: false,
        message: 'wrong credentials'
    })
    
}

const checkAuthGraphQL = async(req) => {
    console.log('middleware GraphQL')

    if (req.headers && req.headers.authorization) {
        const header = req.headers.authorization
        const hdParts = header.split(' ')
        let chkToken = ''
        
        if (hdParts.length > 1) {
            chkToken = hdParts[1]
        }

        try {
            const payload = jwt.verify(chkToken, SECRET)
            return {
                user: payload.user
            }

        } catch (e) {
            console.log('could not auth ->', e)
        }

    }
    
    return {}
    
}

module.exports = {
    auth, checkAuth, checkAuthGraphQL
}