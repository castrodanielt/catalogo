let productosGlobal = [];

fetch("data/products.json")
    .then(response => response.json())
    .then(productos => {

    productosGlobal = productos;
    renderProductosPorCategoria(productosGlobal);

}).catch(error => console.error("Error al intentar cargar productos"),error);

function renderProductosPorCategoria(productos){

    const catalogo = document.getElementById("catalogo");
    catalogo.innerHTML = "";

    const productosAgrupados = {};

    productos.forEach(producto=>{
        const categoria = producto.categoria;

        if(!productosAgrupados[categoria]){
            productosAgrupados[categoria] = [];
        }

        productosAgrupados[categoria].push(producto);
    });

    for(let categoria in productosAgrupados){

        const tituloCategoria = document.createElement("h2");
        tituloCategoria.textContent = categoria;
        catalogo.appendChild(tituloCategoria);

        const contenedor = document.createElement("div");
        contenedor.classList.add("contenedor-categoria");

        productosAgrupados[categoria].forEach(producto=>{
            const card = document.createElement("div");
            card.classList.add("producto");

            const img = document.createElement("img");
            img.src = producto.imagen;

            const descripcion = document.createElement("p");
            descripcion.textContent = producto.descripcion;

            const marca = document.createElement("p");
            marca.textContent = producto.marca;

            card.appendChild(img);
            card.appendChild(descripcion);
            card.appendChild(marca);

            contenedor.appendChild(card);
        });
        catalogo.appendChild(contenedor);
    }

    
}