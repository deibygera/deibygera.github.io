// Tienda online
/*
    Segunda Entrega Desafio
    Deiby Picado
 *Se utiliza localstorage para el carrito de compras (Archivo JSON).
 *Se utiliza .filter() para busqueda de productos.
 *Se utiliza .find() para agregar producto al carrito -se agregan por codigo unico.

Actualizacion 23-6-22
''''' AGREGANDO OPERADORES AVANZADOS¨
En mostrarProductos() se usa el operador ++  (contador++;)
Se usa Spread para la plantilla del DOM para cada producto. FUNCION: mostrarProductos(filtro)
Se cambiaron algunos IF por operador ternario. sumarTotal(), Verificador del carrito.

Actualizacion 25-6-22
Se agrega Sweetalert y Toastify, vaciarCarrto(). animacionAgregadoAlCarrito(producto)

Actualizacion 29-6-22
Se corrigio un bug que habia al eliminar productos.(No se eliminaba el producto correcto).
 carritoDeCompras.splice(carritoDeCompras.indexOf(producto),1);

 Actualizacion 2-7-22
 
 Se obtionen los productos desde un servidor remoto utilizando Fetch.
 function mostrarProductos()
 
Actualizacion  12-7-22

Se agrego busqueda por voz y enlace Linkedin.

Actualizacion 14-7-22
Se agrega un timeout para el modal de publicidad
Actualizacion 15-7-22
Slider de Bootstrap no estaba funcionando, se creo un slider Manual utilizando setInterval.

Actualizacion 19-7-22
Se agrego API de tipo de cambio.
Se agrego un Catch para el fetch presente en mostrarProductos()

Actualizacion  20-7-22
Se agrego un simulador de Pago. La pagina para ingresar datos de la tarjeta es de un tercero que compartio el codigo fuente.

Se intento agregar un API de conversion de moneda, pero la mayoria son de pago y se agotaron los request  gratis  con las pruebas.
https://apilayer.com/marketplace/exchangerates_data-api#errors
*/

// Variables GLOBALES

let contenedorPrincipal = document.getElementById("contenedorPrincipal"),vistaProductos="",vistaCarrito="",campoBusqueda =document.getElementById("campoBusqueda"),categorias =document.querySelectorAll(".categoria"),btnCarrito=document.getElementById("btnCarrito"),elementosVisibles,carritoDeCompras,modalCarrito=document.getElementById("modalcarrito"),tablaCarrito=document.getElementById("tablaCarrito"),closeIcon=document.getElementsByClassName("closeicon"),btnIrPago=document.getElementById("btnIrPago"),btnVaciarCarrito=document.getElementById("btnVaciarCarrito"),montoTotal=document.getElementById("montoTotal"), vistaAnimaciones=document.querySelector(".vistaAnimaciones");
let modalOfertas=document.getElementById("modalOfertas"), cerrarModalOfertas=document.querySelectorAll(".modalclose"),slider=document.getElementById("slider");
let totalaPagar=0;
let productos=[];
// Se verifica si ya hay elementos en el carrito

localStorage.getItem("carritoDeCompras") ? carritoDeCompras=JSON.parse(localStorage.getItem("carritoDeCompras")) :carritoDeCompras=[];
// if(localStorage.getItem("carritoDeCompras")){
//     carritoDeCompras=JSON.parse(localStorage.getItem("carritoDeCompras"));
// }else{
//     carritoDeCompras=[];
// }
let letras = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  function codigoAleatorio(securitylevel) {
    let codigoNuevo = "";
    for (let x = 0; x < securitylevel; x++) {
      codigoNuevo += letras[Math.floor(Math.random() * letras.length)];
      codigoNuevo += Math.floor(Math.random() * 9);
      codigoNuevo += letras[Math.floor(Math.random() * letras.length)];
      codigoNuevo += Math.floor(Math.random() * 9);
      codigoNuevo += letras[Math.floor(Math.random() * letras.length)];
      codigoNuevo += letras[Math.floor(Math.random() * letras.length)];
      codigoNuevo += Math.floor(Math.random() * 9);
    }
    return codigoNuevo;
  }
  
  arrayDeImagenes=["img/productos/bootswoman1.jpg","img/productos/glovestationbrown.jpg","img/productos/bootsmen1.jpg"];
  setTimeout(function(){
    $('#modalOfertas').modal('show');
    $('.carousel').carousel()
    $('.carousel').carousel({
      interval: 1000
    })
}, 2000);
slidercount=0;
setInterval(function(){
  if(slidercount<arrayDeImagenes.length){
    slider.src=arrayDeImagenes[slidercount];
    slidercount++;
    }else{
      slidercount=0;
      slider.src=arrayDeImagenes[slidercount];
    slidercount++;
    }

},2000);


cerrarModalOfertas.forEach((button) =>{

  button.addEventListener("click",()=>{
    $('#modalOfertas').modal('hide');
  })
}
  );


// Clase Molde para Nuevos Productos
class Producto{
    constructor (codigo,nombre,cantidad,precio){
            this.codigo=codigo;
            this.nombre=nombre;
            this.cantidad=cantidad;
            this.precio=precio;
           
    }
}
// Funciones
function mostrarProductos(filtro){
    contenedorPrincipal.innerHTML="";
    vistaProductos="";
//fetch('https://repository.deibygerardo.repl.co/productos.json')
fetch('js/products.json')
.then(response => response.json())
.then(data => productos=data)
.then(()=>console.log(productos))
.catch(error => console.log('error', error))
.then(()=>{

if(!filtro){
    let contador=1;
    vistaProductos+=`<div class="row">`;
    for (const p of productos){
        let contenedorProducto=[`<div class="col">`,`<img src="${p.imagen}" /><br/>`,`<span><b>${p.nombre}</b></span><br/>`,`<span class="description"><b>Descripcion: </b>${p.descripcion}</span><br/>`,`<span><b>Precio: </b>$${p.precio}</span><br/>`,`<i codigo="${p.codigo}" class="fa fa-cart-plus agregarCarrito"></i></div>`];
        contenedorProducto=[...contenedorProducto].join("");
        if(contador%6==0){
            vistaProductos+=`</div><div class="row">`;
           vistaProductos+= contenedorProducto;
        }else{
            vistaProductos+= contenedorProducto;
        }
        contador++;
    }
    // Rellenar espacios vacios para ordenar el DOM
   do{
    vistaProductos+=`<div class="col"></div>`;
    contador++
   }while(contador%6!=0);
    contenedorPrincipal.innerHTML=vistaProductos;
    elementosVisibles=document.querySelectorAll(".agregarCarrito");
}else{
    contenedorPrincipal.innerHTML="";
    vistaProductos="";
    contador=1;
    vistaProductos+=`<div class="row">`;
    for (const p of filtro){
        let contenedorProducto=[`<div class="col">`,`<img src="${p.imagen}" /><br/>`,`<span><b>${p.nombre}</b></span><br/>`,`<span class="description"><b>Descripcion: </b>${p.descripcion}</span><br/>`,`<span><b>Precio: </b>$${p.precio}</span><br/>`,`<i codigo="${p.codigo}" class="fa fa-cart-plus agregarCarrito"></i></div>`];
            contenedorProducto=[...contenedorProducto].join("");
        if(contador%6==0){
            vistaProductos+=`</div><div class="row">`;
            vistaProductos+= contenedorProducto;
        }else{
            vistaProductos+= contenedorProducto;
        }
        contador++;
    }
    // Rellenar espacios vacios para ordenar el DOM
   do{
    vistaProductos+=`<div class="col"></div>`;
    contador++
   }while(contador%6!=0);
    contenedorPrincipal.innerHTML=vistaProductos;
}
elementosVisibles=document.querySelectorAll(".agregarCarrito");
eventoAgregarAlCarrito();
});
}



// EVENTOS

//Cuando la pagina carga entonces se muestran los productos
window.addEventListener("load",()=>{
    mostrarProductos();
    elementosVisibles=document.querySelectorAll(".agregarCarrito");
    
});

 function animacionAgregadoAlCarrito(producto){
    Toastify({
        text: `Se ha agregado ${producto.nombre} al carrito.`,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, 
        offset: {
            x: "3em", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: "5em" // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },// Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
       }



// Buscar dinamicamente por nombre
campoBusqueda.addEventListener("input",()=>{
 let valor= campoBusqueda.value;
 productosFiltrados = productos.filter((element) => {
    return element.nombre.toLowerCase().includes(valor.toLowerCase());
  });

 if(productosFiltrados.length>0){
    mostrarProductos(productosFiltrados);
 }else{
    contenedorPrincipal.innerHTML="";
    contenedorPrincipal.innerHTML+="<div><span><b>Sin resultados<b></span></div>";
 }
});

// Filtro por categorias
categorias.forEach((cat)=>{
    cat.addEventListener("click",()=>{
        console.log(cat.getAttribute("filter"));
        switch(cat.getAttribute("filter")){
            case "1":
                productosFiltrados = productos.filter((element) => {
                    return element.categoria=="accesorios";
                  });
                  mostrarProductos(productosFiltrados);
                break;
            case "2":
                productosFiltrados = productos.filter((element) => {
                    return element.categoria=="botellas";
                  });
                  mostrarProductos(productosFiltrados);
                break;
            case "3":
                    productosFiltrados = productos.filter((element) => {
                        return element.categoria=="bultos";
                      });
                      mostrarProductos(productosFiltrados);
                    break;
                    case "4":
                        productosFiltrados = productos.filter((element) => {
                            return element.categoria=="guantes";
                          });
                          mostrarProductos(productosFiltrados);
                        break;
                        case "5":
                            productosFiltrados = productos.filter((element) => {
                                return element.categoria=="tiendasdecampana";
                              });
                              mostrarProductos(productosFiltrados);
                            break;

                            case "6":
                                productosFiltrados = productos.filter((element) => {
                                    return element.categoria=="zapatos";
                                  });
                                  mostrarProductos(productosFiltrados);
                                break;
                                case "7":
                               
                                  mostrarProductos();
                                break;
                            default:
                                console.log("Error interno.")
                                break;

        }


    });
});
function sumarTotal(){
    totalaPagar=0;
    for(let producto of carritoDeCompras){
        producto.cantidad>1 ? totalaPagar+=producto.precio*producto.cantidad : totalaPagar+=producto.precio;
    }
    return totalaPagar;
}

function mostrarCarrito(){
    vistaCarrito="";
    for(const item of carritoDeCompras){
        vistaCarrito+=`<tr>`;
        vistaCarrito+=`<th scope="row">${item.codigo}</th><td>${item.nombre}</td><td>${item.cantidad}</td><td>$${item.precio}</td><td><i class="fa fa-eye itemview"></i>&nbsp;<i class="fa fa-close itemremove"></i></td>`;
        vistaCarrito+=`</tr>`;
    }
    tablaCarrito.innerHTML=vistaCarrito;
    montoTotal.innerHTML="";
    montoTotal.innerHTML+="$"+sumarTotal();
    let itemremoveIcons=document.querySelectorAll(".itemremove");
    itemremoveIcons.forEach(element => {
        element.addEventListener("click",()=>{
            let codigoproducto=element.parentNode.parentNode.childNodes[0].innerHTML;
            producto = carritoDeCompras.find((el) => {
                return el.codigo==codigoproducto;
              });
              if(producto.cantidad==1){
                //console.log("indexof" +carritoDeCompras.indexOf(producto));
              carritoDeCompras.splice(carritoDeCompras.indexOf(producto),1);
              localStorage.setItem("carritoDeCompras",JSON.stringify(carritoDeCompras));
              sumarTotal();
              Toastify({
                text: `Se ha removido ${producto.nombre} del carrito carrito.`,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                stopOnFocus: true, 
                offset: {
                    x: "3em", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                    y: "5em" // vertical axis - can be a number or a string indicating unity. eg: '2em'
                  },// Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function(){} // Callback after click
              }).showToast();

              mostrarCarrito();
            }else{
               producto.cantidad--;
               localStorage.setItem("carritoDeCompras",JSON.stringify(carritoDeCompras));
               sumarTotal();
               Toastify({
                text: `Se ha removido ${producto.nombre} del carrito carrito.`,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                stopOnFocus: true, 
                offset: {
                    x: "3em", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                    y: "5em" // vertical axis - can be a number or a string indicating unity. eg: '2em'
                  },// Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function(){} // Callback after click
              }).showToast();
               mostrarCarrito();
            }
        });
    });
   
}
function vaciarCarrito(){
    
    Swal.fire({
        title: 'Esta seguro de vaciar el carrito?',
        text: "Se removeran todos los productos!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            carritoDeCompras=[];
            localStorage.removeItem("carritoDeCompras");
            mostrarCarrito();
          Swal.fire(
            'Se ha vaciado el carrito!'
          )

        }
      })
}
function agregarElementoAlCarrito(codigo){
 producto = productos.find((element) => {
    return element.codigo==codigo;
  });
  // verificar si existe
  let resultado=carritoDeCompras.find((e)=>{ return e.codigo===codigo});
        if(resultado){
            carritoDeCompras[carritoDeCompras.indexOf(resultado)].cantidad+=1;
            carritoDeCompras[carritoDeCompras.indexOf(resultado)].precio+=producto.precio;
        //debug
        //console.log("coincidencia"+carritoDeCompras.indexOf(resultado));
        localStorage.setItem("carritoDeCompras",JSON.stringify(carritoDeCompras));
        animacionAgregadoAlCarrito(producto);
        
        }else{
            carritoDeCompras.push(new Producto(producto.codigo,producto.nombre,1,producto.precio));
            // Guardar cambios en JSON
            localStorage.setItem("carritoDeCompras",JSON.stringify(carritoDeCompras));
            animacionAgregadoAlCarrito(producto);
            
        }
  
}

function eventoAgregarAlCarrito(){
elementosVisibles.forEach((e)=>{
   e.addEventListener("click",()=>{
    agregarElementoAlCarrito(e.getAttribute("codigo"));
   });
});
}

btnCarrito.addEventListener("click",()=>{
    modalCarrito.classList.add("mostrar");
    mostrarCarrito();
});
closeIcon[0].addEventListener("click",()=>{
    modalCarrito.classList.remove("mostrar");
});

btnVaciarCarrito.addEventListener("click",()=>{
    vaciarCarrito();
    montoTotal.innerHTML="";
    totalaPagar=0;
});

btnIrPago.addEventListener("click",()=>{
  $('#modalPago').modal('show');
 document.getElementById("totalPagar").innerHTML+="$"+sumarTotal() +"(Dolar USA)";
  document.querySelectorAll(".modalclose1").forEach((button) =>{

    button.addEventListener("click",()=>{
      $('#modalPago').modal('hide');
    });
    document.getElementById("paybutton").addEventListener("click",()=>{
      Swal.fire({
        title: 'Proceder con la compra?',
        text: "Por favor confirme su compra",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          $('#modalPago').modal('hide');
          modalCarrito.classList.remove("mostrar");
          Swal.fire(
            'Gracias por su compra!'
          )

        }
      })
    });
   
   
  });
  
});

