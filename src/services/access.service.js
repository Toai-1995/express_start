const shopModel = require("../models/shop.models");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const {createTokenPair} = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const {ConflictRequestError, BadRequestError, AuthFailureError} = require('../core/error.response');
const { findByEmail } = require("./shop.service");

const saltRounds = 10;
const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

class AccessService {

  static logout = async (keyStore) => {
    const delKey = await KeyTokenService.removeKeyById(keyStore._id)
    return delKey
  }

  static login = async ({email, password, refreshToken = null}) => {
    const foundShop = await findByEmail({email})
    if (!foundShop) throw new BadRequestError('Shop not registered')

    const match = bcrypt.compare(password, foundShop.password)
    if(!match) throw new AuthFailureError('Authentication error')

    const privateKey = crypto.randomBytes(64).toString('hex')
    const publicKey = crypto.randomBytes(64).toString('hex')
    
    const { _id: userId} = foundShop
    const tokens = await createTokenPair(
      {userId, email},
      publicKey,
      privateKey
      )
    
    await KeyTokenService.createKeyToken({
      userId,
      privateKey,
      publicKey,
      refreshToken: tokens.refreshToken 
    })

      return {
        shop: getInfoData({ field: ["_id", "name", "email"], object: foundShop}),
        tokens
      }
  }

  static signUp = async ({ name, email, password }) => {
    const holderShop = await shopModel.findOne({ email }).lean();
    if (holderShop) {
      throw new ConflictRequestError()
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, salt);
    const newShop = await shopModel.create({
      name,
      email,
      password: passwordHash,
      roles: [RoleShop.SHOP],
    });
    if (newShop) {
      //create private key and public key
      const privateKey = crypto.getRandomValues(64).toString('hex')
      const publicKey = crypto.getRandomValues(64).toString('hex')

      const keyStore = await KeyTokenService.createKeyToken({
        userId: newShop._id,
        publicKey
      })

      if(!keyStore){
        return {
          code: "xxxxx",
          message: "publicKey Error",
        }
      }

      const tokens = await createTokenPair(
          {userId: newShop._id, email},
          publicKey,
          privateKey
          )
      return {
          shop: getInfoData({ field: ["_id", "name", "email"], object: newShop}),
          tokens
      }
    }
  };
}

module.exports = AccessService;
