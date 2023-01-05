const shoppingCart = document.querySelector('#carrito');
const cartContainer = document.querySelector('#lista-carrito tbody')
const emptyCartButton = document.querySelector('#vaciar-carrito')
const coursesList = document.querySelector('#lista-cursos');
let productsInCart = [];

loadEventListeners();

function loadEventListeners() {
  coursesList.addEventListener('click', addCourseToCart);
  
  // delete products from shopping cart
  shoppingCart.addEventListener('click', deleteProduct);

  // show the content from the localStorage
  document.addEventListener('DOMContentLoaded', () => {
    productsInCart = JSON.parse(localStorage.getItem('cart')) || [];
    showItemsInShoppingCart();
    
  })

  // Clean the whole shopping cart
  emptyCartButton.addEventListener('click', () => {
    productsInCart = [];
    cleanShoppingCart();
  })
}

function addCourseToCart(e) {
  e.preventDefault()
  
  if (e.target.classList.contains('agregar-carrito')) {
    selectedCourse = e.target.parentElement.parentElement
    readInfoCourseSelected(selectedCourse)
  }
  
  
}

// delete products from the shopping cart

function deleteProduct(e) {

  if ( e.target.classList.contains('borrar-curso') ) {
    productId = e.target.getAttribute('data-id')
    
    // delete product using data-id attribute

    productsInCart = productsInCart.filter((product) => product.id !== productId)
    
    showItemsInShoppingCart();
  }

}

function readInfoCourseSelected(course) {
  
  const infoCourse = {
    image: course.querySelector('img').src,
    title: course.querySelector('h4').textContent,
    price: course.querySelector('.precio span').textContent,
    id: course.querySelector('a').getAttribute('data-id'), 
    quantity: 1
  }

  //check if some course its already in the shopping cart, so not add the course only update de quantity

  const exists = productsInCart.some( course => course.id === infoCourse.id )
  if (exists) {
    const newArr = productsInCart.map( course => {
      if( course.id === infoCourse.id ) {
        course.quantity++;
        return course;
      } else {
        return course;
      }
    })
    productsInCart = [...newArr]
  } else {
    productsInCart = [...productsInCart, infoCourse]
  }
  
  showItemsInShoppingCart();
}

// Show the shopping cart in HTML

function showItemsInShoppingCart() {

  // Clean the html in shopping cart
  cleanShoppingCart();
  
  productsInCart.forEach((product) => {
    const { image, title, price, quantity, id } = product;
    const row = document.createElement('tr');
    row.innerHTML = `
      
        <td><img src="${image}"></td>
        <td>${title}</td>
        <td>${price}</td>
        <td>${quantity}</td>
        <td><a href="#" class="borrar-curso" data-id="${id}"> x </td>
     
    `;

    cartContainer.appendChild(row);

    // Add the cart contents to the localStorage
    
    
  })
  synchronizeStorage();

}


function synchronizeStorage() {
    localStorage.setItem('cart', JSON.stringify(productsInCart));
    
}


function cleanShoppingCart() {
  while(cartContainer.firstChild) {
    cartContainer.firstElementChild.remove()
    console.log(productsInCart)
  }
}


