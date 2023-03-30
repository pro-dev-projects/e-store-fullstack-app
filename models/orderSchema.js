import {Schema,model} from "mongoose"

//referrance docuements
//embedded documents

const orderSchema = new Schema({
    userId: {type:Schema.Types.ObjectId, ref:"users", required:true},
    total: {type:Number, required:true},
    products: [ {type:Schema.Types.ObjectId, ref:"products" } ],
    /* createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date, default:Date.now} */
},
{timestamps:true}
)

const OrderCollection = model("orders",orderSchema)

export default OrderCollection;
