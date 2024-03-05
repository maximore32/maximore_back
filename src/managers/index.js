const fs = require("fs");
const path = require("path");
const { getDatos, saveDatos } = require("../varios");

class ProductManager {
  constructor(ruta) {
    //this.path=rutaArchivo
    //this.products=[]
    this.ruta = ruta;
  }

  getProducts() {
    //let lecturaArchivo=fs.readFileSync(this.path, {encoding:"utf-8"})
    //return JSON.parse(lecturaArchivo);
    return getDatos(this.ruta);
  }

  addProduct({title, description, price, thumbnail, stock, code} ) {
    //if(!title || !description || !price || !thumbnail||!stock || !code){
    //console.log("Debe completar todos los campos!!!!")
    //return
    //}

    let prods = this.getProducts();

    let existe = prods.find((codigo) => codigo.code === code);

    if (existe) {
      console.log(`El producto con el codigo ${code} ya esta registrado`);
      return;
    }

    let id = 1;
    if (prods.length > 0) {
      id = prods[prods.length - 1].id + 1;
    }

    

    let nuevoproduct = {
      id,
      code,
      title,
      description,
      price,
      thumbnail,
      stock,
    };

    prods.push(nuevoproduct);

    saveDatos(this.ruta, prods);

    //fs.writeFileSync(this.path, JSON.stringify(this.products,null,2, {encoding:"utf8"}))

    return nuevoproduct;
  }

  getId(id) {
    let productid = this.products.find((c) => c.id === id);

    if (!productid) {
      return `No existen productos con el codigo ${id}`;
    } else {
      return productid;
    }
  }

  updateProduct(id, updatedProduct) {
    let productos = this.getProducts();
    const index = productos.findIndex((product) => product.id === id);
    if (index !== -1) {
      productos[index] = { ...productos[index], ...updatedProduct };
      fs.writeFileSync(this.ruta, JSON.stringify(productos, null, 2));
      return productos[index];
    } else {
      console.log(`No exite el producto con el id ${id}`);
    }
  }

  deleteProduct(id) {
    let productos = this.getProducts();
    const index = productos.findIndex((product) => product.id === id);

    if (index !== -1) {
      productos.splice(index, 1);

      fs.writeFileSync(this.ruta, JSON.stringify(productos, null, 4));
      return console.error("producto eliminado correctamente");
    } else {
      console.error(`No se encuentran productos con el id ${id}`);
    }
  }
}

//const producto01=new ProductManager("./productos.json")
//producto01.addProduct("Zapatillas", "zapatillas para corredores",100, "imagen",200, "ABC123")

//producto01.addProduct("Ventilador", "Ventilador de tipo industrial",300, "imagen",120, "ABC223")
//producto01.addProduct("Heladera", "Heladera de tipo industrial",3000, "imagen",120, "ABC323")
//producto01.addProduct("Sillom", "Sillon de cuero importado",1000, "imagen",120, "ABC423")
//producto01.addProduct("Zapatillas", "zapatillas para corredores",100, "imagen",200, "ABC125")
//producto01.addProduct("Mesa", "Mesa rectangular de roble",300, "imagen",120, "ABC623")
//producto01.addProduct("Televisor", "Televisor de tamaño meadiano",400, "imagen",120, "ABC823")
//console.log(producto01.getProducts())

//console.log(producto01.getId(1));
//console.log(producto01.getId(55));
//producto01.deleteProduct(2);
//producto01.updateProduct(2,{price:500})

module.exports = ProductManager;
