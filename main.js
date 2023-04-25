// BooksArray class definition
class BooksArray extends Array {
    constructor(...args) {
      super(...args);
      this.idCounter = 0;
    }
  
    addBook(title, author) {
      const book = { title, author, id: ++this.idCounter };
      this.push(book);
      return book;
    }
  
    removeBook(id) {
      for (let i = 0; i < this.length; i++) {
        if (this[i].id === id) {
          this.splice(i, 1);
          return true;
        }
      }
      return false;
    }
  
    findById(id) {
      for (let i = 0; i < this.length; i++) {
        if (this[i].id === id) {
          return this[i];
        }
      }
      return null;
    }
  
    getAllBooks() {
      return this.map((book) => `${book.title} by ${book.author}, ID: ${book.id}`);
    }
  }
  
  // DOM manipulation functions
  function displayBooks() {
    const booksList = document.getElementById("books-list");
    const books = JSON.parse(localStorage.getItem("books")) || [];
  
    booksList.innerHTML = "";
    books.forEach((book) => {
      const li = document.createElement("li");
      li.textContent = `${book.id} - ${book.title} by ${book.author}`;
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => {
        const booksArray = new BooksArray(...books);
        booksArray.removeBook(book.id);
        localStorage.setItem("books", JSON.stringify(booksArray));
        displayBooks();
      });
      li.appendChild(removeButton);
      booksList.appendChild(li);
    });
  }
  
  function addBook() {
    const titleInput = document.getElementById("title-input");
    const authorInput = document.getElementById("author-input");
    const booksList = document.getElementById("books-list");
  
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
  
    if (title && author) {
      const books = JSON.parse(localStorage.getItem("books")) || [];
      const booksArray = new BooksArray(...books);
      const book = booksArray.addBook(title, author);
      localStorage.setItem("books", JSON.stringify(booksArray));
      const li = document.createElement("li");
      li.textContent = `${book.id} - ${book.title} by ${book.author}`;
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => {
        const booksArray = new BooksArray(...books);
        booksArray.removeBook(book.id);
        localStorage.setItem("books", JSON.stringify(booksArray));
        displayBooks();
      });
      li.appendChild(removeButton);
      booksList.appendChild(li);
      titleInput.value = "";
      authorInput.value = "";
    }
  }
  
  // Event listeners
  document.getElementById("add-book-button").addEventListener("click", addBook);
  window.addEventListener("load", displayBooks);
  