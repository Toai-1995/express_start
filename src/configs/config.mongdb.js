const dev = {
    app_dev: {
        port: process.env.DEV_PORT
    },
    db: {
       user_name: process.env.DEV_MONGO_DB_USER_NAME,
       password: process.env.DEV_MONGO_DB_PASSWORD
    }
}


const config = { dev }
const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]