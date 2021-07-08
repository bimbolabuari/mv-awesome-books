// eslint-disable-next-line max-classes-per-file
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = (Math.random() + 1).toString(36).substring(7);
  }
}

class Archive {
  static obtainBooks() {
    let booksArray;
    if (localStorage.getItem('booksArray') === null) {
      booksArray = [];
    } else {
      booksArray = JSON.parse(localStorage.getItem('booksArray'));
    }
    return booksArray;
  }

  static addBook(book) {
    const booksArray = Archive.obtainBooks();
    booksArray.push(book);
    localStorage.setItem('booksArray', JSON.stringify(booksArray));
  }

  static removeBook() {
    const booksArray = Archive.obtainBooks();
    booksArray.forEach((book, index) => {
        booksArray.splice(index, 1);
        localStorage.setItem('booksArray', JSON.stringify(booksArray));
    });
  
  }
}

class ShowBooks {
  static renderBooks() {
    const booksArray = Archive.obtainBooks();
    booksArray.forEach((book) => {
      ShowBooks.createBookElement(book);
    });
  }

  static createBookElement(book) {
    const list = document.querySelector('#book-collection');
    const bookItem = document.createElement('li');
    bookItem.classList.add('book-item', 'alternate');
    bookItem.id = `${book.id}`;
    bookItem.innerHTML = `
    <div class="flex">
      <p class="pt-3">"${book.title}"<span class="ml-3">by</span></p>
      <p class="pt-3 ml-3">${book.author}</p>
    </div>
    <button class="pl-4 pr-4"><a href="#" class="delete">Remove</a></button>
    `;
    list.appendChild(bookItem);
  }

  static deleteBook(element) {
    if (element.classList.contains('delete')) {
      element.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}

document.addEventListener('DOMContentLoaded', ShowBooks.renderBooks);

document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  const book = new Book(title, author);

  ShowBooks.createBookElement(book);
  Archive.addBook(book);
  ShowBooks.clearFields();
});

document.querySelector('#book-collection').addEventListener('click', (e) => {
  ShowBooks.deleteBook(e.target);
  console.log(Archive.removeBook());
});