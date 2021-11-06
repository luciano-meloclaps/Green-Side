
/// text area
// $("#input-tarea").on("input", () =>{
//     const val = $("#input-tarea").val().trim()

//     if( val.length <=10 ){
//         $("#input-tarea").addClass("invalido")
//         $("#input-tarea").removeClass("valido")
//     } else {
//         $("#input-tarea").addClass("valido")
//         $("#input-tarea").removeClass("invalido")
//     }
// })

///cartas

const cards = document.getElementById('cards')
// const templateCard = document.getElementsByClassName('template-card').content
// const fragment = document.createDocumentFragment()


document.addEventListener('DOMContentLoaded', () => {
    fetchData()
})

const fetchData = async () => {
    try{
        const res = await fetch ("../js/productos.json")
        const data = await res.json()
        console.log(data)
        // pintarCards(data)
    } catch (error) {
            console.log(error)
    }
}


///add 
const items = document.getElementById('cards')

items.addEventListener('click', e  => {
        addCarrito(e)
        })


///carrito add
const addCarrito = e => {
    // console.log(e.target)
    // console.log(e.target.classList.contains('btn-primary'))
    if (e.target.classList.contains('btn-primary')) {
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const cardID = data => { 
    console.log(data)
    data.foreach(producto => {
cards.querySelector('btn-primary').dataset.id = producto.id
})
}

///carrito 

let carrito = {}

const setCarrito = objeto => {
    console.log(objeto)
    const producto = {
        id: objeto.querySelector('.btn-primary').dataset.id,
        // title: objeto.querySelector('card-title').textContent,
        cantidad: 1
    }

    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = { ...producto }
    
    // pintarCarrito()
}

// id dinamicos

// function*generadorIds( id = 1){
//     while(true){
//         yield id;
//         ++id;
//     }
// } 

// let genarador = generadorIds();

const idGen = data => {
    console.log(data)
    data.foreach(producto =>{
        items.querySelector('btn-primary').dataset.id = producto.id
    })
}


// async function fetchMoviesJSON() {
//     const response = await fetch(‘/movies’);
//     const movies = await response.json();
//     return movies;
// }