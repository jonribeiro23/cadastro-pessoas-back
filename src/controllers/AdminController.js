const connection = require('../database/connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../../config/auth')

const responseModel = {
    success: false,
    data: [],
    error: []
}

module.exports = {
    async login(req, res) {
        const response = {...responseModel}

        const { email, password } = req.body
        
        try {
            const [, data] = await connection.query(`
                SELECT * FROM admin WHERE email='${email}'
            `)

            if (data.length == 0) {
                response.error.push("Email incorreto")
                response.data = null
                return res.status(401).json(response)
            }
            
            if (!(await bcrypt.compare(password, data[0].password))) {
                response.error.push("Senha incorreta")
                return res.status(401).json(response)
            }

            response.success = true
            response.data.push({
                user: {
                    email: data[0].email
                },
                token: jwt.sign(
                    {id: data[0].id},
                    config.secret,
                    {expiresIn: config.expire}
                )
            })

            return res.status(200).json(response)
        } catch (error) {
            response.error.push(error)
            return res.status(500).json(response)
        }
    },

    async createAdmin(req, res) {
        const response = {...responseModel}
        let { email, password } = req.body
        password = await bcrypt.hash(password, 8)

        try {
            const [, affectRows] = await connection.query(`
            INSERT INTO admin VALUES (
                DEFAULT, 
                '${email}', 
                '${password}', 
                NOW(), 
                NOW()
            )
        `)
        response.success = affectRows > 0

        return res.json(response)

        } catch (error) {
            response.error.push(error)
            return res.status(500).json(response)
        }
    }
}
