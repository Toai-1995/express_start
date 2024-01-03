const AccessService = require("../services/access.service");
const {Success, Created, SuccessResponse} = require('../core/success.response')
class AccessController {

    async login(req, res, next){
        new SuccessResponse({
            metadata: await AccessService.login(req.body )
        })
    }

    async signUp(req, res, next){
        new Created({
            message: "Register Oke",
            metadata: await AccessService.signUp(req.body)
        }).send(res)
    }
}

module.exports = new AccessController()