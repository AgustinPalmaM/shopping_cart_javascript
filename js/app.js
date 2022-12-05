const shoppingCart = document.querySelector('#carrito');
const cartContainer = document.querySelector('#lista-carrito tbody')
const emptyCartButton = document.querySelector('#vaciar-carrito')
const coursesList = document.querySelector('#lista-cursos');
let productsInCart = [];

loadEventListeners();

function loadEventListeners() {
  coursesList.addEventListener('click', addCourseToCart)
}

function addCourseToCart(e) {
  e.preventDefault()

  if (e.target.classList.contains('agregar-carrito')) {
    selectedCourse = e.target.parentElement.parentElement
    readInfoCourseSelected(selectedCourse)
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

  productsInCart = [...productsInCart, infoCourse]
  console.log(productsInCart);
  showItemsInShoppingCart();
}

// Show the shopping cart in HTML

function showItemsInShoppingCart() {

  // Clean the html in shopping cart
  cleanShoppingCart();
  
  productsInCart.forEach((product) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      
        <td><img src="${product.image}"></td>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>${product.quantity}</td>
        <td></td>
     
    `;

    cartContainer.appendChild(row);
    

  })

}

function cleanShoppingCart() {
  while(cartContainer.firstChild) {
    cartContainer.removeChild(cartContainer.firstChild)
  }
}