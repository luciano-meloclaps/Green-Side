// Templates Cards, Footer y Carrito
const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()

//Crear carrito con 0 elementos
let carrito = {}

// Eventos
document.addEventListener('DOMContentLoaded', () => {
    fetchData()

    // LocalStorage
    if(localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }
})

//e > capturar elementos que queremos modificar
cards.addEventListener('click', e => {
    addCarrito(e)
})

//Eventos Btn
items.addEventListener('click', e =>{
    btnAccion(e)
})

const fetchData = async () => {
    try { 
        const res = await fetch('../js/productos.json');
        const data = await res.json()
    
    pintarCards(data)
    } catch (error) {
        console.log(error)
    }
}

// Mostras las tarjetas, imprimirlas en DOM
const pintarCards = data => {
    data.forEach( producto => {
        templateCard.querySelector('h5').textContent = producto.producto
        templateCard.querySelector('p').textContent = producto.precio
        templateCard.querySelector('.btn-dark').dataset.id = producto.id
        templateCard.querySelector('img').setAttribute('src', producto.thumbnailUrl)
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)

    })
        cards.appendChild(fragment)
}

//Capturamos eventos y mandamos a setCarrito
    const addCarrito = e => {
    //Si existe el elemto btn-dark = T
    if (e.target.classList.contains('btn-dark')) {
        //Empujamos la informacion
        setCarrito(e.target.parentElement)
    }
    //Para detener eventos que se pueden generar en cards
    e.stopPropagation()
    
}

//Capturar elementos que van a ser empujados en el carrito
const setCarrito = objeto => {
    //Accedo a la informacion
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1 
    }

    //Se pregunta si existe el elemento y se aumenta la cantidad si existe
    if(carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    //Empujar al carrito y ejecutar                
    carrito[producto.id] = {...producto}
    pintarCarrito()

}

//Recorrer e imprimir el carrito con los elementos capturados anteriormente
const pintarCarrito = () => {
    items.innerHTML = ""
    //Lo que empujamos de setCarrito
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio

        //Botones
        templateCarrito.querySelector('.btn-dark').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id

        //Clonar
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })

    //Mostramos en "Items" DOM
    items.appendChild(fragment)

    pintarFooter()

    //LocalStorage guarda
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

//Mostar el mensaje del footer
const pintarFooter = () => {
    footer.innerHTML = ''  
    //Cuando vaciemos el carrito da el msj
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
            <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>`

            return
    }

    //Funcion flecha y retorno (acc > acumulado)
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)

    //Imprimir
    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    //Clonar
    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    //Btn Vaciar Carrito
    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', () => {
        carrito = {}
        
        //Mostrar
        pintarCarrito()
    })
}

//Botones Funcion + -

const btnAccion = e => {
    //Aumentar
    if (e.target.classList.contains('btn-dark')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito [e.target.dataset.id] = {...producto}

        //Mostrar
        pintarCarrito()
    }


    //Restar
    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if(producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        }

        //Mostrar
        pintarCarrito()     
    }

    e.stopPropagation()
}

// // API MERCADO PAGO 

// // //Finalizar Compra 
// // const finalizarCompra = () => {

// //     //Return al carrito 

// //     console.log(carrito)//BORAR

// //     const cardsToMP = carrito.map( (producto) => {
// //         return {
// //             title: producto.producto,
// //             quantity: producto.cantidad,
// //             category_id: producto.id,
// //             currency_id: "ARS",
// //             unit_price: producto.precio,
// //             description: "",
// //             picture_url: ""
// //         }
// //     })

// //     console.log(cardsToMP)//BORAR

// //     fetch('https://api.mercadopago.com/checkout/preferences', {
// //         method: 'POST',
// //         headers: {
// //             Authorization: "Bearer TEST-3041818924671039-111215-5a12551ccf3bdd4477ef6175fac83573-235267743"
// //         },
// //         body: JSON.stringify({
// //             cards: cardsToMP,
// //             back_urls: {
// //                 success: window.location.href,
// //                 failure: window.location.href
// //             }
// //         })
// //     })
// //         .then (res => res.json())
// //         .then( data => {
// //             console.log(data)

// //             window.location.replace(data.init_point)
// //         })

// // }