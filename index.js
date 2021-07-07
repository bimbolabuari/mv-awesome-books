const titleValue = document.querySelector('#title');
const authorValue = document.querySelector('#author');
const form = document.querySelector('#form');

const generateId = () => (Math.random() + 1).toString(36).substring(7);

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.titleValue = titleValue;
    this.id = generateId();
  }
}

class Archive {
  static obtainBooks() {
    let booksArray;
    if(localStorage.getItem('booksArray') === null) {
      booksArray = [];
    } else {
      booksArray = JSON.parse(localStorage.getItem('booksArray'))
    }
    return booksArray;
  }

  static addBook(book) {
    const booksArray = Archive.obtainBooks();
    booksArray.push(book)
    localStorage.setItem('booksArray', JSON.stringify(booksArray));
  }

  static removeBook(id) {
    const booksArray = Archive.obtainBooks();

    booksArray.forEach((book, index) => {
      if(book.id === id) {
        booksArray.splice(index, 1)
      }
    });
  localStorage.setItem('booksArray', JSON.stringify(booksArray));
  }
}

class ShowBooks {

  static renderBooks() {
    const booksArray = Archive.obtainBooks();
    booksArray.forEach((book) => ShowBooks.createBookElement(book));
  }

  static createBookElement(book) {
    const list = document.querySelector('#book-collection');
    const bookItem = document.createElement('li');

    bookItem.innerHTML = `
      <p>${book.title}</p>
      <p>${book.author}</p>
      <p>${book.id}</p>
      <p><a href="#" class="delete">Remove</a></p>
    `;
    list.appendChild(bookItem)
  }

}

document.addEventListener('DOMContentLoaded', Archive.renderBooks);

document.querySelector('#book-form').addEventListener('submit', (e) => { 
  e.preventDefault();
  const title = document.querySelector('#title').value
  const author =document.querySelector('#author').value
  const id = document.querySelector('#id').value

  const book = new Book(title, author, id);
  
  Archive.createBookElement(book);
  Archive.addBook(book);

});
 



addBookToLibrary(event) {
    event.preventDefault();
    const titleBook = titleValue.value;
    const authorBook = authorValue.value;
    const newBookObject = new Book(titleBook, authorBook);
    localStorage.setItem('newBookObject', JSON.stringify(newBookObject));
    bookArray.push(newBookObject);
    displayBook(newBookObject, bookCollection);
    form.reset();

const firstBook = new Book('Crime', 'Dostoyevsky');
const secondBook = new Book('The Devil', 'Bulgakov');

let bookArray = [firstBook, secondBook];

const bookCollection = document.querySelector('#collection');

const createBookElement = (book) => {
  const bookContainer = document.createElement('div');
  bookContainer.id = `${book.id}`;
  bookContainer.innerHTML = `
    <h2>${book.title}</h2>
    <h3>${book.author}</h3>
    <button type="button" data-action="delete" data-book-id="${book.id}">Remove</button>
    `;
  return bookContainer;
};

const displayBook = (book, bookCollection) => {
  const newBookElement = createBookElement(book);
  bookCollection.appendChild(newBookElement);
};

bookArray.forEach((book) => {
  displayBook(book, bookCollection);
});



// const addBookToLibrary = (event) => {
//   event.preventDefault();
//   const titleBook = titleValue.value;
//   const authorBook = authorValue.value;
//   const newBookObject = new Book(titleBook, authorBook);
//   localStorage.setItem('newBookObject', JSON.stringify(newBookObject));
//   bookArray.push(newBookObject);
//   displayBook(newBookObject, bookCollection);
//   form.reset();
// };

form.addEventListener('submit', addBookToLibrary);

const deleteBook = (id) => {
  const filteredBook = bookArray.filter((book) => book.id !== id);
  const deleteBookArticle = document.getElementById(`${id}`);
  deleteBookArticle.remove();
  bookArray = filteredBook;
};

document.addEventListener('click', (event) => {
  if (!event.target.dataset.action) {
    return;
  }

  const { bookId } = event.target.dataset;

  if (event.target.dataset.action === 'delete') {
    deleteBook(bookId);
  }
});

const storeValue = () => {
  const formData = {
    name: titleValue.value,
    owner: authorValue.value,
  };
  localStorage.setItem('formData', JSON.stringify(formData));
};

form.addEventListener('input', storeValue);
const newFormData = JSON.parse(localStorage.getItem('formData'));

form.title.value = newFormData.name;
form.author.value = newFormData.owner;
