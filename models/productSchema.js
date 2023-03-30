import {Schema, model} from "mongoose"

const productSchema = new Schema({
    title: {type:String, required:true},
    description: {type:String, required:true},
    price: {type:Number, required:true},
    rating :{type:Number, required:true},
    brand:{type:String, required:true},
    category:{type:String, required:true},
    thumbnail:{type:String, required:true},
    images: {type:Array, required:false}, /* [{type:String}] */
})

const ProductCollection = model("products",productSchema ) // products

export default ProductCollection;