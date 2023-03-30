import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import productsRoute from "./routes/productsRoute.js"
import usersRoute from "./routes/usersRoute.js"
import ordersRoute from "./routes/ordersRoute.js"
import fileupload from "express-fileupload"
import ImageCollection from "./models/imageSchema.js"
import stream from "stream"
/* import cors from "cors" */
dotenv.config()
 import Stripe from "stripe"
export const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
//create express server
const app = express()
//
const PORT = process.env.PORT || 4000;

//mongoose connection
mongoose.connect(process.env.URI).then(()=>console.log("Connection to DB established!")).catch(err=>console.log(err.message))

//data
//products (crud operation)
//users 
//orders


//MVC architecture
// Models
// Views
// Controllers

//handling cors
/* app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","http://localhost:5173")
    next()
}) */
/* app.use(cors({origin:"http://localhost:5173",exposedHeaders:["token"]})) */

//External Middlewares
//parsing json data
app.use(express.json())

//form www-form-urlencoded data
app.use(express.urlencoded({extended:true}))

//handling/parsing form data multer or express-fileupload
app.use(fileupload())

//express.static middleware serves static files
app.use(express.static("views/dist"))

//create index route
/* app.get("/",(req,res)=>{
    res.sendFile("./views/dist/index.html", {root:"."})
}) */
//Client Side Routing
//Server Side Routing

app.use("/products", productsRoute )

app.use("/users", usersRoute)

app.use("/orders", ordersRoute)

app.get("/images/:filename", async(req,res)=>{

    const image = await ImageCollection.findOne({filename:req.params.filename})
    // filename, data, userId
    //creating read stream
    const readStream = stream.Readable.from(image.data)
    readStream.pipe(res)
})

app.listen(PORT, ()=>console.log(`Server is running on PORT: ${PORT}`))