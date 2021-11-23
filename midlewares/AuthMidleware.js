const jwt = require('jsonwebtoken')
const config = require('../config/auth')
const { promisify } = require('util')

module.exports = async (req, res, next) => {
    const auth = req.headers.authorization;

    if (!auth) {
        return res.status(403).json({
            error: true,
            code: 130,
            message: "O token de autenticação não foi enviado."
        })
    }

    const [, token] = auth.split(' ')

    try {
        // const decoded = await promisify(jwt.verify(token, config.secret))
        const decoded = await promisify(jwt.verify)(token, config.secret)
        
        if (!decoded) {
            return res.status(403).json({
                error: true,
                code: 130,
                message: "Token inválido."
            })
        }

        next()

    } catch (error) {
        return res.status(403).json({
            error: true,
            code: 130,
            message: error
        })
    }
}