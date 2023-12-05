const shopModel = require("../models/shop.models");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const {createTokenPair} = require("../auth/authUtils");

const saltRounds = 10;
const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

class AccessService {
  static signUp = async ({ name, email, password }) => {
    const holderShop = await shopModel.findOne({ email }).lean();
    if (holderShop) {
      return {
        code: "xxxxx",
        message: "Shop already register",
      };
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
      const {publicKey, privateKey} = crypto.generateKeyPairSync("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: "pkcs1",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs1",
          format: "pem",
        },
      });
      const publicKeyString = await KeyTokenService.createKeyToken({
        userId: newShop._id,
        publicKey
      })

      if(!publicKeyString){
        return {
          code: "xxxxx",
          message: "publicKey Error",
        }
      }

      const publicKeyObject = crypto.createPublicKey(publicKeyString)
      const tokens = await createTokenPair(
          {userId: newShop._id, email},
          publicKeyObject,
          privateKey
          )
      console.log(`Create token success::`, tokens)
      return {
        code: 201,
        metadata:{
          shop: newShop,
          tokens
        }
      }
    }
  };
}

module.exports = AccessService;