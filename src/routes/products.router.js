const Router = require("express").Router;
const ProductManager = require("../managers/index.js");


//const { join } = require("path");
const { rutaProds } = require("../utils.js");

const router = Router();

//let rutaProd = join(__dirname, "..", "data", "productos.json");

const pm = new ProductManager(rutaProds);

router.get("/", (req, res) => {
  let { limit } = req.query;
  let productos = pm.getProducts();
  try {
    productos;
  } catch (error) {
    console.log(error.message);
  }

  if (limit && limit > 0) {
    productos = productos.slice(0, limit);
  }

  res.setHeader("Content-Type", "application/json");
  res.status(200).json({ productos });
  console.log(productos);
});
router.get("/:id", (req, res) => {
  console.log(req.query);
  let { id } = req.params;
  id = Number(id);
  if (isNaN(id)) {
    return res.send("El id tiene que ser de tipo numérico...!!!");
  }

  let productoID = pm.getProducts().find((producto) => producto.id === id);

  if (!productoID) {
    return res.send(`No existen productos con id ${id}`);
  }
  res.setHeader("Content-Type", "application/json");
  res.status(200).json({ productoID });
});

router.post("/", (req, res) => {
  let { title, description, price, thumbnail, stock, code } = req.body;

  if (!title || !description  || !price || !stock || !code) {
    res.setHeader("Content-Type", "application/json");
    return res.status(400).json({ error: `Debe completar todos los campos` });
  }

  let nuevoproducto = pm.addProduct(req.body);

  req.io.emit("nuevoProducto", nuevoproducto)

  res.setHeader("Content-Type", "application/json");
  res.status(201).json({ nuevoproducto });
  console.log(nuevoproducto);
});

router.put("/:id", (req, res) => {
  let id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "id debe ser numérico" });
  }
  pm.updateProduct(id, req.body);
  res.setHeader("Content-Type", "application/json");
  return res.status(200).json({ productoActualizado: pm.getProducts() });
});

router.delete("/:id", (req, res) => {
  let id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "id debe ser numérico" });
  }

  pm.deleteProduct(id);
  res.setHeader("Content-Type", "application/json");
  return res.status(200).json({ productoEliminado: pm.getProducts() });
});

module.exports = router;
