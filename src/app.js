const express=require("express")
const path=require('path');
//import { cartRouter } from "./routes/cart.router.js";
const {Server}=require("socket.io")
const handlebars=require("express-handlebars")
const vistasRouter=require("./routes/vistas.router")
const productRouter=require("./routes/products.router") 
const cartRouter=require("./routes/cart.router")

const PORT=3000
let io;

const app=express();

app.engine("handlebars", handlebars.engine())
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'/views'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'/public')));

app.use("/api/products", (req, res, next)=>{
  req.io=io
  next()
}, productRouter)

app.use("/api/carts", cartRouter)
app.use("/",vistasRouter)

//app.get('/',(req,res)=>{
  //  res.setHeader('Content-Type','text/plain');
    //res.status(200).send('Pagina Inicial');
//})

app.get('*',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(404).send('error 404 - page not found');
})


//app.listen(PORT, ()=>{
  //  console.log(`Corriendo en puerto ${PORT}`)
//})
const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

io=new Server(server)