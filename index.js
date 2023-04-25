class BooksArray extends Array {
    constructor(...args) {
      super(...args);
      this.idCounter = 0;
    }
  
    addBook(title, author) {
      const book = { title, author, id: ++this.idCounter };
      this.push(book);
      addBookToLocalStorage(book);
      return book;
    }
  
    removeBook(id) {
      for (let i = 0; i < this.length; i++) {
        if (this[i].id === id) {
          this.splice(i, 1);
          removeBookFromLocalStorage(id);
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
  
  function addBookToLocalStorage(book) {
    let books = getBooksFromLocalStorage();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
  
  function removeBookFromLocalStorage(id) {
    let books = getBooksFromLocalStorage();
    books = books.filter(book => book.id !== id);
    localStorage.setItem('books', JSON.stringify(books));
  }
  
  function getBooksFromLocalStorage() {
    let books = [];
    const booksString = localStorage.getItem('books');
    if (booksString) {
      books = JSON.parse(booksString);
    }
    return books;
  }
  
  const books = new BooksArray(...getBooksFromLocalStorage());
  