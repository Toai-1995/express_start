'use strict'

const { filter, update } = require('lodash')
const keyTokenModel = require('../models/keytoken.model')
const { options } = require('../routes')
class KeyTokenService {

    static createKeyToken = async ({userId, publicKey, privateKey, refreshToken}) => {
        try {
            const filter = {user: userId}
            const update = {publicKey, privateKey, refreshTokensUsed: [], refreshToken}
            const options = {upsert: true, new: true}
            const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options)
            return tokens ? tokens.publicKey : null
        } catch (err){
            return err
        }
    }
}

module.exports = KeyTokenService