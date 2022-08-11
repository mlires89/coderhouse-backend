const express = require ('express');
const app = express();
const PORT = 8080;

// importo la clase Contenedor del ejercicio anterior
const Contenedor = require('./assets/contenedor.js')

//Creo una instancia de la clase para poder invocar sus metodos posteriormente
const cont = new Contenedor.Contenedor('./assets/productos.txt');

//Listar Productos
const mostrarProductos = async (req, res) => {
    const data = await cont.getData();
    res.send(`Estos son los productos ${JSON.stringify(data)}`);
}

//Producto Random
const getRandom = async (req, res) => {
    const maxID = await cont.getMax();
    const minID = await cont.getMin();
    const random = await cont.getById(Math.round(Math.random() * (maxID - minID) + minID ))
//combino la funcion Math.round con Math.random para obtener un numero entero aleatorio entre el id max y min de la data
   res.send(`Producto Random: ${JSON.stringify(random)}`) 
}



app.get('/productos', mostrarProductos)
app.get('/productoRandom',getRandom )

 // Conectando el server
const server = app.listen(PORT, ()=>{ 
    console.log(`Mi server ExpressJS listening on port ${PORT}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`));

