// Cards, Footer y Carrito templates
const items = document.getElementById('items')
const cards = document.getElementById('cards')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()

//Crear carrito
let carrito = {}

// Eventos
document.addEventListener('DOMContentLoaded', () =>{
    fetchData()
});

cards.addEventListener('click', e => {
    addCarrito(e)
})

const fetchData = async () => {
    try { 
        const res = await fetch('../js/productos.json');
        const data = await res.json()
    // console.log(data)
    pintarCards(data)
    } catch (error) {
        console.log(error)
    }
}

// Pintar productos
const pintarCards = data => {
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.producto
        templateCard.querySelector('p').textContent = producto.precio
        templateCard.querySelector('.btn-dark').dataset.id = producto.id
        // templateCard.querySelector('img').setAttribute('src', producto.thumbnailUrl)

        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
        cards.appendChild(fragment)
}

//Ejecutamos evento y mandamos a setCarrito
const addCarrito = e => {
    // console.log(e.target)
    // console.log(e.target.classList.contains('btn-dark'))
    if (e.target.classList.contains('btn-dark')) {
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
    
}

//Capturar elementos que van a ser empujados en el carrito
const setCarrito = objeto => {
    const producto = {
        //Accedo a la informacion
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1 
    }

    //Se pregunta si existe el elemento y se aumenta la cantidad
    if(carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    //Empujar al carrito 
    carrito[producto.id] = {...producto}
    pintarCarrito()

}

//Recorrer e imprimir el carrito con los elementos capturados anteriormente
const pintarCarrito = () => {
    // console.log(carrito)
    items.innerHTML = ''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('span').textContent = producto.precio * producto.cantidad

        //botones
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id

        //Clonar
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })

    //Pintamos
    items.appendChild(fragment)

    pintarFooter()

}

//Mostar el mensaje del footer
const pintarFooter = () => {
    footer.innerHTML = ""  
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
            <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th> `
    }

    //Funcion flecha y retorno (acc > acumulado)
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)
    // console.log(nPrecio)

    //Imprimir
    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)
}           