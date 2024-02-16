'use strict'

const JWT = require('jsonwebtoken')
const { asyncHandler } = require('../helper/asyncHandler')
const { AuthFailureError, NotFoundError } = require('../core/error.response')
const { findByUserId } = require('../services/keyToken.service')


const HEADER = {
    API_KEY:  'x-api-key',
    AUTHORIZATION: 'authorization',
    CLIENT_ID: 'x-client-id' 
}

const createTokenPair = async (payload, publicKey, privateKey)=>{
    try {
        //access token
        const accessToken = await JWT.sign(payload,privateKey, {
            expiresIn: '2 days'
        })

        const refreshToken = await JWT.sign(payload,privateKey, {
            expiresIn: '7 days'
        })
        JWT.verify(accessToken, publicKey, (err, decode)=>{
            if(err){
                console.error(`error verify::`,err)
            }else{
                console.log(`decode verify::`, decode)
            }
        })
        return {
            accessToken,
            refreshToken
        }
    }catch (err){
        console.log(err)
    }
}

const authentication = asyncHandler( async(req, res, next) => {
    /***
     * check userId missing
     * get acess token
     * verify token
     * check user in db
     * check keyStore with userId
     * return next
     */

    const userId = req.headers[HEADER.CLIENT_ID]
    if(!userId) throw new AuthFailureError('In valid request client_id')

    const keyStore = await findByUserId(userId)
    if(!keyStore) throw new NotFoundError('Not found key store')

    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if(!accessToken) throw new AuthFailureError('Invalid request')

    try{
        const decodeUser = JWT.verify(accessToken, keyStore.privateKey)
        if(userId !== decodeUser.userId) throw new AuthFailureError('Invalid User')
        req.keyStore = keyStore
        return next()
    }catch(err){
        throw err
    }
})

module.exports = {
    createTokenPair,
    authentication
}