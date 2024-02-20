"use trict";
const ProductService = require("../services/product.service");
const { SuccessResponse } = require("../core/success.response");
class ProductController {
  createProduct = async (req, res, next) => {
    new SuccessResponse({
      message: "Create new Product success!",
      metadata: await ProductService.createProduct({
        ...req.body,
        product_shop: req.user.userId,
      }),
    }).send(res);
  };

  //query
/**
 * @description Get all draft
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
  getAllDraftForShop = async (req, res, next) => {
    new SuccessResponse({
      message: " Get list draft success",
      metadata: await ProductService.findAllDraftForShop(
        req.user.userId
      ),
    }).send(res);
  };

  //end query
}

module.exports = new ProductController();
