const AccessService = require("../services/access.service");
const {Success, Created} = require('../core/success.response')
class AccessController {

    async signUp(req, res, next){
        new Created({
            message: "Register Oke",
            metadata: await AccessService.signUp(req.body)
        }).send(res)
    }
}

module.exports = new AccessController()