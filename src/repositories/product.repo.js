"use strict";

const {
  product,
  electronic,
  clothing,
  furniture,
} = require("../models/product.model");
const { Types } = require("mongoose");

const findAllDraftForShop = async (query, limit, skip) => {
  return await queryProduct(query, limit, skip)
};

const findAllPublishForShop = async (query, limit, skip) => {
    return await queryProduct(query, limit, skip)
}

  const queryProduct = async(query, limit, skip)=>{
    return await product
      .find(query)
      .populate("product_shop", "name email _id")
      .sort({ updateAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();
  };


const publishProductByShop = async ({product_id, product_shop}) => {
    const foundShop = await product.findOne({
    product_shop: new Types.ObjectId(product_shop),
    _id: new Types.ObjectId(product_id),
  });
  if (!foundShop) return null;

  foundShop.isDraft = false;
  foundShop.isPublish = true;
  const {modifiedCount} = await foundShop.updateOne(foundShop);
  return modifiedCount
};



module.exports = {
  findAllDraftForShop,
  publishProductByShop,
  findAllPublishForShop
};
