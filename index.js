let bookArray = [
     firstBook = {
        title: this.title,
        author:  this.author
    },
     secondBook = {
        title:  this.title,
        author: this.author
    }
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

function displayBook(array, bookCollection) {
 const newBookElement = createBookElement(book);
  bookCollection.appendChild(newBookElement);
}

bookArray.forEach(array => {
    displayBook(array, bookCollection);
})

function addBookToLibrary(book) {
    bookArray.push(book);
};

// function renderLibrary() {
//     for(let i = 0; i <)
// newBook = new Book(titleValue, authorValue)
// addBookToLibrary(newBook);