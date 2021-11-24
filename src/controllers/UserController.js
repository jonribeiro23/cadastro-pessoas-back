const connection = require('../database/connection')

const responseModel = {
    success: false,
    data: '',
    error: []
}

module.exports = {

    async createUser(req, res) {
        const response = {...responseModel}
        const { 
            nome,
            email,
            telefone,
            dataNascimento,
            sexo
        } = req.body

        try {
            const [, affectRows] = await connection.query(`
            INSERT INTO users VALUES (
                DEFAULT, 
                '${nome}', 
                '${email}', 
                '${telefone}', 
                '${dataNascimento}', 
                '${sexo}', 
                NOW(), 
                NOW()
            )
        `)

        response.success = affectRows > 0
        response.data = "Usuário cadastrado com sucesso."

        return res.json(response)

        } catch (error) {
            response.error.push(error)
            return res.json(response)
        }
    },

    async getUsers(req, res) {
        const response = {...responseModel}

        try {
            const [, data] = await connection.query(`
            SELECT id, nome, email, telefone, dataNascimento, sexo FROM users ORDER BY id DESC
            `)

            response.success = true
            response.data = data

            return res.status(200).json(response)

        } catch (error) {
            response.error.push(error)
            return res.status(500).push(error)
        }
    }
}
