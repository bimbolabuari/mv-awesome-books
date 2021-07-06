const generateId = () => (Math.random() + 1).toString(36).substring(7);

function Book(title, author) {
  this.title = title;
  this.author = author;
  this.id = generateId();
}

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

const titleValue = document.querySelector('#title');
const authorValue = document.querySelector('#author');
const form = document.querySelector('#form');

const addBookToLibrary = (event) => {
  event.preventDefault();
  const titleBook = titleValue.value;
  const authorBook = authorValue.value;
  const newBookObject = new Book(titleBook, authorBook);
  bookArray.push(newBookObject);
  displayBook(newBookObject, bookCollection);
};

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
