'use strict'

const JWT = require('jsonwebtoken')

const createTokenPair = async (payload, publicKey, privateKey)=>{
    try {
        //access token
        const accessToken = await JWT.sign(payload,privateKey, {
            algorithm: 'RS256',
            expire: '2 days'
        })

        const refreshToken = await JWT.sign(payload,privateKey, {
            algorithm: 'RS256',
            expire: '4 days'
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

    }
}

module.exports = {
    createTokenPair
}