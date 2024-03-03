const socket=io()

socket.on("nuevoProducto", data=>{
    console.log(data)
    let ulProds=document.getElementById("prodslista") 
    ulProds.innerHTML+=`<li>Productos: <strong>${data.title}}</strong> - Descripción: <i>${data.description}}</i></li>`

})