const AccessService = require("../services/access.service");
const {Success, Created, SuccessResponse} = require('../core/success.response')
class AccessController {

    async logout(req, res, next){
        new SuccessResponse({
            message: 'Logout success',
            metadata: await AccessService.logout(req.keyStore)
        }).send(res)
    }

    async login(req, res, next){
        new SuccessResponse({
            metadata: await AccessService.login(req.body )
        }).send(res)
    }

    async signUp(req, res, next){
        new Created({
            message: "Register Oke",
            metadata: await AccessService.signUp(req.body)
        }).send(res)
    }
}

module.exports = new AccessController()