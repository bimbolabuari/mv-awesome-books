function Book(title, author) {
    this.title = title,
    this.author = author
}

function generateId() {
    return (Math.random() + 1).toString(36).substring(7);
  }

const firstBook = new Book('Crime', 'Dostoyevsky')
const secondBook = new Book('The Devil', 'Bulgakov')

let bookArray = [firstBook, secondBook];

const bookCollection = document.querySelector('#collection')
const createBook = document.querySelector('#createBook')

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
const form = document.querySelector('#form')

function addBookToLibrary(event) {
    event.preventDefault();
  const titleBook = titleValue.value;
  const authorBook = authorValue.value;
  const newBookObject = new Book(titleBook, authorBook)
  bookArray.push(newBookObject);
  displayBook(newBookObject, bookCollection)
}

form.addEventListener('submit', addBookToLibrary);

addBookToLibrary();