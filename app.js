//FIXME: ALERT ==> ES5 OLDER BEHAVIOR
//BOOK CONSTRUCTOR
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI CONSTRUCTOR
function UI() {}

//Add book to list
UI.prototype.addBookToList = function ({ title, author, isbn }) {
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
};

//Clear input fields
UI.prototype.clearFields = function () {
  document.getElementById("title").value = " ";
  document.getElementById("author").value = " ";
  document.getElementById("isbn").value = " ";
};

//Show Alert
UI.prototype.showAlert = function (message, className) {
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
};

//Delete Book
UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    //Remove the book
    target.parentElement.parentElement.remove();
    //Instantiate UI
    const ui = new UI();
    //Show success alert
    ui.showAlert("Book Deleted Successfully", "success");
  }
};

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
  if (!(title || author || isbn)) {
    //Show failure message
    ui.showAlert("Please Fill / Check Out All the Fields", "error");
  } else {
    //Add book to list
    ui.addBookToList(book);

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
  //To prevent default behavior
  e.preventDefault();
});
