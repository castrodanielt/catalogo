let productosGlobal = [];

fetch("https://docs.google.com/spreadsheets/d/1JEU4TSNFhUG16dwqjD-DBSSwYLXu432F1qBMXGKq0ZI/export?format=csv")
    .then(response => response.text())
    .then(text => {
    
    const datos = parseCSV(text);

    productosGlobal = datos;
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
            card.classList.add("card");

            const img = document.createElement("img");
            img.src = producto.imagen;
            img.classList.add("card-img-top");

            const cardCuerpo = document.createElement("div");
            cardCuerpo.classList.add("card-body");

            const descripcion = document.createElement("h5");
            descripcion.textContent = producto.descripcion;
            descripcion.classList.add("card-title");

            const marca = document.createElement("p");
            marca.textContent = producto.marca;

            const btnCard = document.createElement("button");
            btnCard.classList.add("btn","btn-primary");
            btnCard.textContent = "Detalle";

            btnCard.addEventListener("click", ()=>{
                document.getElementById("modalTitulo").textContent = producto.descripcion;
                document.getElementById("modalImagen").src = producto.imagen;

                const modal = new bootstrap.Modal(document.getElementById("modalCard"));
                modal.show();
            });
            
            card.appendChild(img);

            cardCuerpo.appendChild(descripcion);
            cardCuerpo.appendChild(marca);
            cardCuerpo.appendChild(btnCard);

            card.appendChild(cardCuerpo);

            contenedor.appendChild(card);
        });
        catalogo.appendChild(contenedor);
    }

    
}

function parseCSV(texto){
    const lineas = texto.split("\n").filter(line => line.trim() != "");
    const encabezados = lineas[0].split(",");

    return lineas.slice(1).map(linea =>{
        const valores = linea.split(",");
        const objeto = {};

        encabezados.forEach((encabezado,index)=>{
            objeto[encabezado.trim()] = valores[index]?.trim();
        });

        return objeto;
    });
}