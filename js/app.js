const shoppingCart = document.querySelector('#carrito');
const cartContainer = document.querySelector('#lista-carrito tbody')
const emptyCartButton = document.querySelector('#vaciar-carrito')
const coursesList = document.querySelector('#lista-cursos');

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

  console.log(infoCourse);
}