const Sequelize = require('sequelize')

const database = process.env.DATABASE
const username = process.env.DATABASE_USERNAME
const password = process.env.PASSWORD
const host = process.env.HOST
const dialect = process.env.DIALECT

const conection = new Sequelize(database, username, password, {
    host,
    dialect
})

module.exports = conection