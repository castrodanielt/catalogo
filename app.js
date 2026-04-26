let productosGlobal = [];

fetch("data/products.json")
    .then(response => response.json())
    .then(productos => {

    productosGlobal = productos;
    renderProductos(productosGlobal);

}).catch(error => console.error("Error al intentar cargar productos"),error);

function renderProductos(productos){

    const catalogo = document.getElementById("catalogo");
    catalogo.innerHTML = "";

    productos.forEach(producto=>{
        const contenedor = document.createElement("div");
        contenedor.classList.add("producto");

        const img = document.createElement("img");
        img.src = producto.imagen;

        const codigo = document.createElement("p");
        codigo.textContent = "Codigo: " + producto.codigo;

        contenedor.appendChild(img);
        contenedor.appendChild(codigo);

        catalogo.appendChild(contenedor);
    });
}