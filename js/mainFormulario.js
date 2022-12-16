const btn = document.getElementById('button');

btn.value = 'Cargando carrito...'

let cadenaCarrito = ''
let desactivado = false

let carrito = JSON.parse(localStorage.getItem('carritoStorage'))

let div = document.querySelector('#carrito');

carrito.forEach(element => {
   cadenaCarrito += `id:${element.id}
   nombre:${element.nombre}
   precio:${element.precio} 
   ; `;

});

let divCarrito = document.createElement('div');
divCarrito.className = 'oculto'
divCarrito.setAttribute('id', 'carrito')
divCarrito.innerHTML = `
<label class="oculto" for="carrito">carrito</label>
<input class="oculto" type="text" name="carrito" id="carrito" value="${cadenaCarrito}">
`

div.appendChild(divCarrito)

desactivado = true

if (desactivado) {
   btn.value = 'Enviar';
   btn.disabled = false
}

document.getElementById('form').addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Enviando...';

   const serviceID = 'default_service';
   const templateID = 'template_928d68y';

   emailjs.sendForm(serviceID, templateID, this)
   .then(() => {
      btn.value = 'Enviar';
      Swal.fire({
         icon: 'success',
         title: 'Formulario Enviado Con Exito',
         showClass: {
            popup: 'animate__animated animate__fadeInDown'
         },
         hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
         }
      })
   }, (err) => {
      console.log(JSON.stringify(err));
      btn.value = 'Enviar';
      Swal.fire({
         icon: 'error',
         title: 'Oops...',
         text: 'Algo salio mal',
         // footer: 'Si el error sigue ocurriendo contactenos a nuestro <br> <a href="https://wa.me/c/5491133370121">Whatsapp</a>'
         footer: `Si el error sigue ocurriendo contactenos a nuestro <a class="wpp-alerta" href="https://wa.me/c/5491133370121">Whatsapp</a>`
      })

   });
});