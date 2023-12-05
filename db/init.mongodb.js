const mongoose = require('mongoose')

const {db: {user_name, password}} = require('../src/configs/config.mongdb')

const connectString = `mongodb+srv://${user_name}:${password}@clusterfree.be1a3s4.mongodb.net/?retryWrites=true&w=majority`
const { countConnect } = require('../src/helper/check.connect')


class Database {
    constructor(){
        this.connect();
    }

    connect(){
        mongoose.connect(connectString)
            .then(_ =>{
                console.log("Connected Moongodb Success");
                countConnect();
            })
            .catch(err => console.log(`Error Connect!`, err))
    }

    static getInstance() {
        if(!Database.instance){
            Database.instance = new Database()
        }

        return Database.instance
    }
}

const instaceMongodb = Database.getInstance()
module.exports = instaceMongodb