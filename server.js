const app = require('./src/app')
const { app_dev: {port}} = require('./src/configs/config.mongdb')

const server = app.listen(port, () => {
    console.log(`WSV start with ${port}`)
})
process.on('SIGINT', ()=>{
    server.close( (err) => {
        console.log(`Exit Server Express`);
        process.exit(err ? 1 : 0)
    })
  
})