const compression = require('compression')
const express = require('express')
const { default: helmet } = require('helmet')
const morgan = require('morgan')
const router = require('./routes')

const app = express()

// console.log(process.env)

// init middlewares
app.use(morgan("dev")) // log
app.use(helmet()) //bao ve header trong request
app.use(compression()) // nen metadata
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))


//init  db
require('../db/init.mongodb')

//init routes

app.use(router)

//handling error

app.use((req, res, next)=>{
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    const errorCode = error.status || 500
    return res.status(errorCode).json({
        status: 'error',
        code: errorCode,
        message: error.message || "Internal Server Error"
    })
})


module.exports = app