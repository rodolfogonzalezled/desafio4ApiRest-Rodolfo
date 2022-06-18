import express from 'express';
import ProductContainer from './productContainer.js';

const app = express()
const routerProducts = express.Router()

app.use('/api/productos', routerProducts)

routerProducts.use(express.json())
routerProducts.use(express.urlencoded({extended: true}))

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(express.static('public'))         // con http://localhost:8080/
app.use('/static', express.static('public')) // con http://localhost:8080/static/

// --- Conexxion del Servidor ------------------------------------------------------
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)});
server.on("error", error => console.log(`Error en servidor ${error}`));
// ---------------------------------------------------------------------------------

const products = new ProductContainer();

// --- Producto Precargado para prueba----------------------------------------------
products.add({
        title: "NBA", 
        price: 2000, 
        thumbnail: "https://image.api.playstation.com/vulcan/ap/rnd/202106/3002/Eaq9uyUlyLZK8L5xTlsPl0rM.png"
    }
);
//----------------------------------------------------------------------------------

routerProducts.get('/', (req, res)=>{
    res.json(products.getAll());
})

routerProducts.get('/:id', (req, res) => {
    let id = req.params.id;
    res.json(products.getById(id));
})

routerProducts.post('/', (req, res) => {
    res.json(products.add(req.body));
})

routerProducts.put('/:id', (req, res)=>{
    res.json(products.put(req.params.id, req.body));
})

routerProducts.delete('/:id', (req, res) => {
    products.deleteById(req.params.id);
    res.sendStatus(200);
})