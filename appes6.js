//TODO: ES6 OOP AND ALSO LOCAL STORAGE

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//Class for UI
class UI {
  addBookToList({ title, author, isbn }) {
    const list = document.getElementById("book-list");
    //create tr element
    const row = document.createElement("tr");
    //Insert cols
    row.innerHTML = `
        <td>${title}</td>
        <td>${author}</td>
        <td>${isbn}</td>
        <td><a href="#" class="delete" >X</a></td>
    `;

    list.appendChild(row);
  }

  showAlert(message, className) {
    //create the div element
    const div = document.createElement("div");
    //add classes
    div.className = `alert ${className}`;
    //Add text
    div.appendChild(document.createTextNode(message));
    //Get Parent
    const container = document.querySelector(".container");
    //Get form
    const form = document.getElementById("book-form");
    //Insert alert
    container.insertBefore(div, form);
    //Clear the alert after 3 seconds
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  clearFields() {
    document.getElementById("title").value = " ";
    document.getElementById("author").value = " ";
    document.getElementById("isbn").value = " ";
  }

  deleteBook(target) {
    if (target.className === "delete") {
      //Remove the book
      target.parentElement.parentElement.remove();
      //Instantiate UI
      const ui = new UI();
      //Show success alert
      ui.showAlert("Book Deleted Successfully", "success");
    }
  }
}

//CLASS FOR LOCAL STORAGE
class Store {
  static getBooks() {
    let books;
    if (!localStorage.getItem("books")) books = [];
    else books = JSON.parse(localStorage.getItem("books"));
    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();
    books.forEach((book) => {
      const ui = new UI();

      //Add Book To UI
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    // console.log(typeof isbn);
    const books = Store.getBooks();
    books.forEach((book, idx) => {
      if (book.isbn === isbn) books.splice(idx, 1);
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}
//Initially when the page is refreshed
document.addEventListener("DOMContentLoaded", Store.displayBooks);

//EVENT LISTENER TO ADD BOOK
document.getElementById("book-form").addEventListener("submit", (e) => {
  //   console.log("Test");
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;
  //   console.log(title, author, isbn);

  //Instantiate book
  const book = new Book(title, author, isbn);
  // console.log(book);

  //Instantiate UI
  const ui = new UI();

  //Validate the user input
  if (
    !(title || author || isbn) ||
    title === " " ||
    author === " " ||
    isbn === " "
  ) {
    //Show failure message
    ui.showAlert("Please Fill / Check Out All the Fields", "error");
  } else {
    //Add book to list
    ui.addBookToList(book);

    //Add to LS
    Store.addBook(book);

    //Show Success Message
    ui.showAlert("Book Data Added Successfully", "success");

    //Clear the input fields
    ui.clearFields();
  }
  //Prevent default behavior ('Page refresh)
  e.preventDefault();
});

//Event Listener For Delete
document.getElementById("book-list").addEventListener("click", (e) => {
  //Instantiate UI
  const ui = new UI();
  //Delete book
  ui.deleteBook(e.target);

  //Delete book from LS
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  //To prevent default behavior
  e.preventDefault();
});
