// Cards
// const cards = document.getElementById('cards')
const items = document.getElementById('items')
// const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
// const templateFooter = document.getElementById('template-footer').content
// const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()

//Crear carrito
let carrito = {}

// Eventos
document.addEventListener('DOMContentLoaded', () =>{
    fetchData()
});

items.addEventListener('click', e => {
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
    console.log(data)
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.producto
        templateCard.querySelector('p').textContent = producto.precio
        templateCard.querySelector('.btn-dark').dataset.id = producto.id
        // templateCard.querySelector('img').setAttribute('src', producto.thumbnailUrl)

        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
        items.appendChild(fragment)
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

//Capturar elementos
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
    
    console.log(carrito)
}

