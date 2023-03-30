import ProductCollection from "../models/productSchema.js"

export const getAllProducts =  async (req,res)=>{
    //request handle // controller
    try{
        const products = await ProductCollection.find()
        res.json({success:true, data: products})
    }
    catch(err){
        res.json({success:false, message: err.message })
    }
}



export const addNewProduct= async (req,res)=>{
    try{
        /* const product = ProductCollection.create(req.body) */
        const product = new ProductCollection(req.body)
        await product.save() 
        res.json({success:true, data:product})
    }
    catch(err){
        res.json({success:false, message: err.message })
    }
}

export const getSingleProduct= async (req,res)=>{
    try{
        const {id} = req.params
       /*  const product = await ProductCollection.findOne({_id:id}) */

        const product = await ProductCollection.findById(id)
        if(product){
            res.json({success: true, data:product})
        }else{
            res.json({success:false, message:"please provide valid id"})
        }
    }
    catch(err){
        res.json({success:false, message: err.message })
    }
}

export const updateProduct = async (req,res)=>{
    try{
        const {id} = req.params
        const updatedProduct = await ProductCollection.findByIdAndUpdate(id,req.body, {new:true})
        res.json({success:true, data:updatedProduct})
    }
    catch(err){
        res.json({success:false, message: err.message })
    }
}

export const deleteProduct = async (req,res)=>{
    try{
        const {id} = req.params
        const deletedProduct = await ProductCollection.findByIdAndDelete(id)
        
        res.json({success:true, data:deletedProduct})
    }
    catch(err){
        res.json({success:false, message: err.message })
    }
} 