const express=require("express")
const productRouter=require("./routes/products.router") 
const cartRouter=require("./routes/cart.router")
//import { cartRouter } from "./routes/cart.router.js";

const PORT=3000

const app=express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter) 

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('Pagina Inicial');
})



app.listen(PORT, ()=>{
    console.log(`Corriendo en puerto ${PORT}`)
})