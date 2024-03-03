const ProductManager = require("../managers/index.js");
const { rutaProds } = require('../utils');

const Router=require('express').Router;
const router=Router()

const pm = new ProductManager(rutaProds);


router.get('/home',(req,res)=>{

    let allprods=pm.getProducts();

    res.status(200).render("home",
    {
        allprods
    })    
})
module.exports =router;