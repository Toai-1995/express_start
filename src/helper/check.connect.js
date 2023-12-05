'use strict'

const  mongoose = require('mongoose')
const os = require('os')

const countConnect = () => {
    const numConnection = mongoose.connections.length
    console.log(`Number connection:: `, numConnection)
}

const checkOverLoad = () => {
    const core = os.cpus().length
}

module.exports = {
    countConnect,
}