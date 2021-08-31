const jwt = require('jsonwebtoken')

const secret = '123459789teste'
const token = jwt.sign({
    user: {
        id: 123,
        name: 'Igor'
    }
}, secret, {expiresIn: '1 days'})

console.log(token)

//válida
console.log(jwt.verify(token, secret))

//token modificado, consequentemente inválido
console.log(jwt.verify(token + 'a', secret))