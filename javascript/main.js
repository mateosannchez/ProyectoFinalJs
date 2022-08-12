function guardarDatos() {
    localStorage.nombre = document.getElementById("nombre").value;
    localStorage.password = document.getElementById("password").value;
}

function recuperarDatos() {
    if ((localStorage.nombre != undefined) && (localStorage.password != undefined)) {
        document.getElementById("datos").innerHTML = "Nombre: " + localStorage.nombre + " Password: " + localStorage.password;
    } else {
        document.getElementById("datos").innerHTML = "No has introducido tu nombre y tu password";
    }


};


const tabla = document.getElementsByClassName("lista-produc");

console.log(tabla)


function cargarProductos(){
    fetch(`./javascript/stock.json`)
        .then(respuesta => respuesta.json())
        .then(productos => {
            productos.forEach(producto => {
                const row = document.createElement(`tr`)
                row.innerHTML = `
                    <td>${producto.producto}</td>
                    <td>${producto.marca}</td>
                    <td>${producto.stock}</td>
                    <td>${producto.precio}</td>
                `;
                tabla[0].appendChild(row);

            })

        })
        .catch(error => console.log("Hubo un error : " + error.message))
}

cargarProductos();



document.addEventListener('DOMContentLoaded', () => {

    const baseDeDatos = [
        {
            id: 1,
            producto: "Termo Stanley",
            stock: 5,
            precio: 20000,
            imagen: `./img/6.jpg`
        },
        {
            id: 2,
            producto: "Termo Termolar",
            stock: 5,
            precio: 8000,
            imagen: `./img/7.jpg`
        },
        {
            id: 3,
            producto: "Mate Torpedo",
            stock: 5,
            precio: 3500,
            imagen: `./img/3.jpg`
        },
        {
            id: 4,
            producto: "Mate Imperial",
            imagen: `./img/2.jpg`,
            stock: 5,
            precio: 6000,
        },

        {
            id: 5,
            producto: "Mate Camionero",
            imagen: `./img/1.jpg`,
            stock: 5,
            precio: 2000,
        },

        {
            id: 6,
            producto: "Yerba Canarias",
            imagen: `./img/cna.jpg`,
            stock: 5,
            precio: 500,
        },

        {
            id: 7,
            producto: "Yerba Rei verde",
            imagen: `./img/9.jpg`,
            stock: 5,
            precio: 700,
        },


        {
            id: 8,
            producto: "Canasta cuero Cuadrada",
            imagen: `./img/12.jpg`,
            stock: 5,
            precio: 3000,
        },

        {
            id: 9,
            producto: "Canasta cuero Doble",
            imagen: `./img/11.jpg`,
            stock: 5,
            precio: 2500,
        },

        {
            id: 10,
            producto: "Bombilla Pico loro alpaca",
            imagen: `./img/bom.jpg`,
            stock: 5,
            precio: 900,
        },


        {
            id: 11,
            producto: "Bombilla Bombillon artesanal",
            imagen: `./img/ññ.jpg`,
            stock: 5,
            precio: 1200,
        },


        {
            id: 12,
            producto: "Combo 1",
            imagen: `./img/10.jpg`,
            stock: 5,
            precio: 12000,
        },


    ];
   
    let carrito = [];
    const divisa = '$';
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const miLocalStorage = window.localStorage;

    
    function renderizarProductos() {
        baseDeDatos.forEach((info) => {
            
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
           
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            
            const miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info.producto;
            
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info.imagen);
            
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = `${divisa}${info.precio}`;
            
            const miNodoBotonLike = document.createElement("button");
            const miNodoBoton = document.createElement('button');
            
            miNodoBotonLike.classList.add('btn', 'btn-primary');
            miNodoBotonLike.textContent = '➕​';
            miNodoBotonLike.setAttribute('marcador', info.id);
            miNodoBotonLike.addEventListener('click', anyadirProductoAlCarrito);
           
            miNodoBoton.classList.add('btn', 'btn-outline-light');
            miNodoBoton.textContent = '❤️​';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', () =>{
                console.log(info.id);
                productosFavoritos.push(info);
                console.log(productosFavoritos);
                mostrarFavoritos()
            });
            
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodoCardBody.appendChild(miNodoBotonLike);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
        });
    }

    let productosFavoritos = [];

    function mostrarFavoritos () {
        const contFav = document.getElementById("favoritos");
        contFav.innerText = ""
        productosFavoritos.map(favorito => {
            const div = document.createElement("div")
            div.classList.add('list-group-item', 'text-right', 'mx-2');
            div.innerHTML = `
            <li class="item">${favorito.producto}</li>
            <button class="btn-danger btn mx-5">X</button>
            `
            contFav.appendChild(div);
            const miBoton = div.querySelector(".btn")
            miBoton.addEventListener("click", () =>{
                console.log(favorito.id);
                productosFavoritos = productosFavoritos.filter((Element)=>Element.id !== favorito.id);
                contFav.innerHTML = "";
                mostrarFavoritos()
            })

        })

    }
    
    function borrarItemFavorito(evento) {
        
        const id = evento.target.dataset.item;
        
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        
        renderizarCarrito();
        
        guardarCarritoEnLocalStorage();

    }
   
  
    function anyadirProductoAlCarrito(evento) {
       
        carrito.push(evento.target.getAttribute('marcador'))
        /
        renderizarCarrito();
        
        guardarCarritoEnLocalStorage();
    }

    function renderizarCarrito() {
       
        DOMcarrito.textContent = '';
        
        const carritoSinDuplicados = [...new Set(carrito)];
        
        carritoSinDuplicados.forEach((item) => {
            
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
               
                return itemBaseDatos.id === parseInt(item);
            });
            
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                
                return itemId === item ? total += 1 : total;
            }, 0);
           
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].producto} - ${divisa}${miItem[0].precio}`;
            
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
        
        DOMtotal.textContent = calcularTotal();
    }

    
    function borrarItemCarrito(evento) {
        
        const id = evento.target.dataset.item;
        
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        
        renderizarCarrito();
        
        guardarCarritoEnLocalStorage();

    }


    function calcularTotal() {
        
        return carrito.reduce((total, item) => {
            
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }

    
    function vaciarCarrito() {
        
        carrito = [];
        
        renderizarCarrito();
        
        localStorage.clear();

    }

    function guardarCarritoEnLocalStorage () {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function guardarLikeEnLocalStorage () {
        miLocalStorage.setItem('like', JSON.stringify(carrito));
    }

    function cargarCarritoDeLocalStorage () {
        
        if (miLocalStorage.getItem('carrito') !== null) {
            
            carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        }
    }

    function cargarLikeDeLocalStorage () {
        
        if (miLocalStorage.getItem('like') !== null) {
            
            like = JSON.parse(miLocalStorage.getItem('like'));
        }
    }

    
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);
    
    cargarCarritoDeLocalStorage();
    renderizarProductos();
    renderizarCarrito();
});
