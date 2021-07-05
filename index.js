
function Book(title, author) {
    this.title = title,
    this.author = author
}

const firstBook = new Book('Crime', 'Dostoyevsky')
const secondBook = new Book('The Devil', 'Bulgakov')

let bookArray = [
    firstBook,
    secondBook
];

const bookCollection = document.querySelector('#collection')
const createBook = document.querySelector('#createBook')
// let newBook;

function createBookElement(book) {
    const bookContainer = document.createElement('div');
    bookContainer.innerHTML = `
    <h2>${book.title}</h2>
    <h3>${book.author}</h3>
    <button type="submit">Remove</button>
    `;
    return bookContainer;
}

function displayBook(book, bookCollection) {
 const newBookElement = createBookElement(book);
  bookCollection.appendChild(newBookElement);
}

bookArray.forEach(book => {
    displayBook(book, bookCollection);
})

const titleValue = document.querySelector('#title')
const authorValue = document.querySelector('#author')
const button = document.querySelector('#bookSubmit')

function addBookToLibrary() {
  const title = titleValue.value;
  const author = authorValue.value;
  const newBookObject = {
      title: title,
      author: author
  }
  console.log(newBookObject)
}

button.addEventListener('click', addBookToLibrary());


// function renderLibrary() {
//     for(let i = 0; i <)
// newBook = new Book(titleValue, authorValue)
// addBookToLibrary(newBook);