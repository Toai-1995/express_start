"use strict";

const { product, clothing, electronic, furniture } = require("../models/product.model");
const { BadRequestError } = require("../core/error.response");
const { model } = require("mongoose");
const { findAllDraftForShop } = require("../repositories/product.repo");
// define factory class to create product

class ProductFactory {
  static async createProduct(payload) {
    const type = payload.product_type;

    const ProductClass = ProductFactory.producRegistry[type]
    if(!ProductClass) throw new BadRequestError(`Invalid Product Type ${type}`)
  
    return new ProductClass(payload).createProduct()
  }

  static producRegistry = {} // key: class

  static registerProducType(type, classRef){
    ProductFactory.producRegistry[type] = classRef
  }


  // query
  static async findAllDraftForShop({product_shop, limit=50, skip=0}){
    const query = {
      product_shop, isDraft: true
    }
    return await findAllDraftForShop(query, limit, skip)
  }
}

// define base product class

class Product {
  constructor({
    product_name,
    product_thumb,
    product_description,
    product_price,
    product_quantity,
    product_type,
    product_shop,
    product_attribute,
  }) {
    this.product_name = product_name;
    this.product_thumb = product_thumb;
    this.product_description = product_description;
    this.product_price = product_price;
    this.product_quantity = product_quantity;
    this.product_type = product_type;
    this.product_shop = product_shop;
    this.product_attribute = product_attribute;
  }

  //create new product
  async createProduct(product_id) {
    return await product.create({
      ...this,
      _id: product_id
    });
  }
}

// define sub-class for different product types clothing

class Clothing extends Product {
  async createProduct() {
    const newClothing = await clothing.create({
      ...this.product_attribute,
      product_shop: this.product_shop
    });
    if (!newClothing) throw new BadRequestError("create new clothing error");

    const newProduct = await super.createProduct(newClothing._id);
    if (!newProduct) throw new BadRequestError("create new product error");
    return newProduct;
  }
}

// define sub-class for different product types Electronics

class Electronics extends Product {
  async createProduct(product_id) {
    const newElectronic = await electronic.create({
      ...this.product_attribute,
      product_shop: this.product_shop,
    });
    if (!newElectronic)
      throw new BadRequestError("create new electronic error");

    const newProduct = await super.createProduct(newElectronic._id);
    if (!newProduct) throw new BadRequestError("create new product error");
    return newProduct;
  }
}

class Furniture extends Product {
  async createProduct(product_id) {
    const newFurniture = await furniture.create({
      ...this.product_attribute,
      product_shop: this.product_shop,
    });
    if (!newFurniture)
      throw new BadRequestError("create new furniture error");

    const newProduct = await super.createProduct(newFurniture._id);
    if (!newProduct) throw new BadRequestError("create new product error");
    return newProduct;
  }
}

// register product type

ProductFactory.registerProducType('Electronics', Electronics)
ProductFactory.registerProducType('Clothing', Clothing)
ProductFactory.registerProducType('Furniture', Furniture)

module.exports = ProductFactory;
