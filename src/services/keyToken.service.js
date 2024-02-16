'use strict'

const keyTokenModel = require('../models/keytoken.model')
const {Types} = require('mongoose')

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

    static findByUserId = async (userId) => {
        return await keyTokenModel.findOne({user: new Types.ObjectId(userId)}).lean()
    }

    static removeKeyById = async(id) => {
        return await keyTokenModel.deleteOne({_id: id})
    }
}

module.exports = KeyTokenService