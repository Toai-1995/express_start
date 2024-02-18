'use strict'

const { Schema, model } = require("mongoose")

const productType =  ['Electronics', 'Clothing', 'Furniture']

const DOCUMENT_NAME = 'Product'
const COLLECTION_NAME = 'Products'

const productSchema = new Schema({
    product_name: { type: String, required: true},
    product_thumb:{ type: String, required: true},
    product_description: String,
    product_price: { type: Number, required: true },
    product_quantity: { type: Number, require: true },
    product_type: { type: String, required: true, enum: productType },
    product_shop: String,
    product_attribute: { type: Schema.Types.Mixed, required: true}
}, {
    collection: COLLECTION_NAME,
    timestamps: true
})

//define the product type = clothing

const clothingSchema =  new Schema({
    brand: { type: String, require: true },
    size: String,
    material: String,
    product_shop: { type: Schema.Types.ObjectId, ref: 'Shop' }
},{
    collection: 'clothes',
    timestamps: true
})

const electronicSchema =  new Schema({
    manufacturer: { type: String, require: true },
    model: String,
    color: String,
    product_shop: { type: Schema.Types.ObjectId, ref: 'Shop' }
},{
    collection: 'electronics',
    timestamps: true
})


module.exports = {
    product: model(DOCUMENT_NAME, productSchema),
    clothing: model('Clothing', clothingSchema),
    electronic: model('Electronics', electronicSchema)
}