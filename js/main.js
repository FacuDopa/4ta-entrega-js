// variables globales
let cantProductos = 0
let carrito = []  //array para los productos agregados por el usuario
let carritoJson = [] // datos del .json en un array
let divCarrito;
let totalCarrito;
let carritoStorageLleno;
let botonEliminar;
// ------------------------------------------

// Obtener elementos del DOM
let seccionCarrito = document.getElementById('seccion-carrito')
let tabla = document.getElementById('tabla-carrito')
let seccionCartas = document.querySelector('#seccion-cards');
let divBotonEliminar = document.getElementById('boton-eliminar')
// --------------------------------------------

// creacion de objetos DOM
let precioFinal = document.createElement('div')
precioFinal.setAttribute('id', 'precio-final')


// funciones

const eliminarCarrito = () => {
   
   // alerta con SweetAlert
   Swal.fire({
      title: '¿Eliminar todo el carrito?',
      text: "Se eliminaran todos tus productos",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#08811e',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar', 
      reverseButtons: true,
   })
   .then((result) => {
      // si se confirma
      if (result.isConfirmed) {
         Swal.fire(
            'Carrito eliminado',
            'Tu carrito esta ahora vacio',
            'success'
         )
         
            // elimina el carrito
         for ( i = 1; i <= carrito.length; i++) {
            // trae del DOM todos los elementos del carrito
            capturarElementos = document.querySelector('.div-carrito');
         
            if (capturarElementos) {
               // elimina los elementos del carrito
               capturarElementos.remove()
            }
         }
         
         // vacia los Storages y los carritos
         localStorage.clear();
         carrito = [];
         recuperado = [];
         
         // reemplaza el precio final por 'Carrito Vacio'
         botonEliminar.remove()
         precioFinal.innerHTML = `
         <h4 class="nombre-carrito"> Carrito Vacio </h4>
         `
         seccionCarrito.insertAdjacentElement('beforeend', precioFinal)
      }else if (result.dismiss == swal.DismissReason.cancel) {
         Swal.fire(
            'Operacion Cancelada',
            '',
            'error'
         )
      }
   })

}

const crearTabla = (carritoStorageLleno) => {

   // se crea el boton para eliminar el carrito
   botonEliminar = document.createElement('button');
   botonEliminar.setAttribute('id', 'eliminar-carrito')
   botonEliminar.innerHTML = 'Eliminar el carrito';
   divBotonEliminar.appendChild(botonEliminar);

   botonEliminar.addEventListener('click', () => eliminarCarrito())

   // se asignan clases -css-
   seccionCarrito.className = 'seccion-carrito'
   tabla.className = 'tabla-carrito'
   precioFinal.className = 'div-carrito'
   
   // creacion de la tabla
   tabla.innerHTML = `
   <h3 class="tabla-carrito-n"> Nombre del Producto </h3>
   <h3 class="tabla-carrito-p"> Precio del Producto </h3>
   `

   // si hay un carrito en el storage crea la tabla y los muestra en el DOM
   if (carritoStorageLleno) {

      console.log(carrito, 'carritorecup');
      console.log(recuperado, 'carrito del storage');

      let carritoStorage = JSON.parse(localStorage.getItem('carritoStorage'))

      for (const buscarRepetidos of carritoStorage) {
         
         let prodAgregar = carritoStorage.find(encontar => encontar.id === buscarRepetidos.id);

         let prodIguales = carrito.find(buscar => buscar.id === prodAgregar.id);

         if (prodIguales) {
            let suma = 1

            carrito.forEach(iguales => {
         
               if (iguales.id == prodIguales.id) {
                  suma ++ 
      
                  let actualizar = document.querySelector(`.id${prodIguales.id}`)
      
                  if (actualizar) {
                     actualizar.remove(actualizar)
                  }
               }
            });

            divCarrito = document.createElement('div');
            divCarrito.className = `div-carrito id${prodAgregar.id}`
            divCarrito.innerHTML = `
            <h4 class="nombre-carrito"> ${prodAgregar.nombre} X${suma}</h4>
            <h4 class="precio-carrito"> $ ${prodAgregar.precio} </h4>
            `
            tabla.insertAdjacentElement('afterend', divCarrito)

         }else{
            divCarrito = document.createElement('div');
            divCarrito.className = `div-carrito id${prodAgregar.id}`;
            divCarrito.innerHTML = `
            <h4 class="nombre-carrito"> ${prodAgregar.nombre} </h4>
            <h4 class="precio-carrito"> $ ${prodAgregar.precio} </h4>
            `
            tabla.insertAdjacentElement('afterend', divCarrito)
         }

         carrito.push({nombre: prodAgregar.nombre, precio: prodAgregar.precio, id: prodAgregar.id})

      }

      totalCarrito = carrito.reduce((acum, item) => acum + item.precio, 0);
      precioFinal.innerHTML = `
      <h4 class="nombre-carrito"> Precio Total de la Compra </h4>
      <h4 class="precio-carrito"> $ ${totalCarrito} </h4>
      `
      seccionCarrito.insertAdjacentElement('beforeend', precioFinal)
   }

}

const agregarCarrito = (id) => {

   // verifica que el carrito esta vacio para crear la estructura del carrito HTML
   if (carrito.length === 0) {
      crearTabla(false)
   }

   // la funcion pasa por parametro la id para encontrar el producto del boton
   let prodAgregar = carritoJson.find(encontar => encontar.id === id);

   let prodIguales = carrito.find(buscar => buscar.id === prodAgregar.id);

   if (prodIguales) {
      let suma = 1;      
      carrito.forEach(iguales => {
         
         if (iguales.id == prodIguales.id) {
            suma ++ 

            let actualizar = document.querySelector(`.id${prodIguales.id}`)

            if (actualizar) {
               actualizar.remove(actualizar)
            }
         }
      });

      // creacion del div y dentro el objeto agregado, integracion con el DOM
      divCarrito = document.createElement('div');
      divCarrito.className = `div-carrito id${prodAgregar.id}`;
      divCarrito.innerHTML = `
      <h4 class="nombre-carrito"> ${prodAgregar.nombre} X${suma} </h4>
      <h4 class="precio-carrito"> $ ${prodAgregar.precio} </h4>
      `
      tabla.insertAdjacentElement('afterend', divCarrito)


   }else{
      // creacion del div y dentro el objeto agregado, integracion con el DOM
      divCarrito = document.createElement('div');
      divCarrito.className = `div-carrito id${prodAgregar.id}`;
      divCarrito.innerHTML = `
      <h4 class="nombre-carrito"> ${prodAgregar.nombre} </h4>
      <h4 class="precio-carrito"> $ ${prodAgregar.precio} </h4>
      `
      tabla.insertAdjacentElement('afterend', divCarrito)
   }
   
   // agrega al carrito el producto seleccionado
   carrito.push({nombre: prodAgregar.nombre, precio: prodAgregar.precio, id: prodAgregar.id})
   
   
   

   // se añade el precio final de todos los productos
   totalCarrito = carrito.reduce((acum, item) => acum + item.precio, 0);
   precioFinal.innerHTML = `
   <h4 class="nombre-carrito"> Precio Total de la Compra </h4>
   <h4 class="precio-carrito"> $ ${totalCarrito} </h4>
   `
   seccionCarrito.insertAdjacentElement('beforeend', precioFinal)

   // se guarda el carrito en el Storage
   localStorage.setItem('carrito', JSON.stringify(carrito));
   let recuperarCarrito = localStorage.getItem('carrito');
   localStorage.setItem('carritoStorage', recuperarCarrito);

   // alerta Toastify
   Toastify({
      text: `${prodAgregar.nombre} agregado al carrito
      Click para verlo`,
      destination: "../index.html#seccion-carrito",
      className: 'noti-toastify',
      duration: 5000,
   }).showToast();
}

let recuperado = JSON.parse(localStorage.getItem('carritoStorage'))
if (recuperado) {
   carritoStorageLleno = true
   // carrito = recuperado
   crearTabla(carritoStorageLleno)
}

// --------------------------------------------


// funcion async para traer los productos del .json
const constructorProductos = async () => {
   const response = await fetch ('../json/productos.json');
   const data = await response.json()

   // forEach para obtener todos los productos y generarlos en el DOM
   data.forEach(producto => {

      cantProductos ++

      let div = document.createElement('div');
      div.className = 'card border-dark';

      div.innerHTML = `
      <img class="card-img-top" height="374" src="${producto.imagenCard}" >
      <div class="card-body">
         <h4 class="card-title border-botto"> ${producto.nombre} </h4> <br>
         <p class="card-text"> ${producto.descripcion} <br> Precio: $${producto.precio} </p>
         <button id="${cantProductos}" class="boton-cards botonDOM">Agregar al carrito</button>
      </div>
      `

      seccionCartas.appendChild(div)

      carritoJson.push({nombre: producto.nombre, precio: producto.precio, id: cantProductos})
      // console.log(carritoJson);
   });

   // Traer los botones del HTML (modificar si se agregan productos)
   const botonRack = document.getElementById('1');
   const botonBanco = document.getElementById('2');
   const botonMesita = document.getElementById('3');
   const botonLapicero = document.getElementById('4');
   const botonCamion = document.getElementById('5');
   const botonAuricular = document.getElementById('6');
   const botonMaceta = document.getElementById('7');

   // escucha de eventos (modificar si se agregan productos)
   botonRack.addEventListener('click', () => agregarCarrito(1));
   botonBanco.addEventListener('click', () => agregarCarrito(2));   
   botonMesita.addEventListener('click', () => agregarCarrito(3));   
   botonLapicero.addEventListener('click', () => agregarCarrito(4));   
   botonCamion.addEventListener('click', () => agregarCarrito(5));   
   botonAuricular.addEventListener('click', () => agregarCarrito(6));   
   botonMaceta.addEventListener('click', () => agregarCarrito(7));
}

constructorProductos();