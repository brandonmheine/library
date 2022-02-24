let myLibrary = [];

const heading = document.querySelector("h1");

const button = document.querySelector("button");
button.addEventListener("click", makeBook);

const addBook = document.querySelector(".creator");

const bookContainer = document.querySelector(".book-container");

const submit = document.querySelector("#submit");
submit.addEventListener("click", addBookToLibrary);

const titleEntry = document.querySelector("#title");
const authorEntry = document.querySelector("#author");
const pageEntry = document.querySelector("#pages");
const readEntry = document.querySelector("#read");

// This function pops up the book entry window
function makeBook() {
  addBook.classList.toggle("hidden");
  heading.style.opacity = "50%";
  bookContainer.style.opacity = "50%";
}

// This function creates the book card after the user has entered correct info into the book entry window
function addCard(title, author, pages, read) {
  const newDiv = document.createElement("div");
  newDiv.style.background = "green";
  newDiv.style.padding = "1rem 2rem";
  newDiv.style.textAlign = "center";
  newDiv.style.alignItems = "center";
  newDiv.style.display = "flex";
  newDiv.style.flexDirection = "column";
  newDiv.style.justifyContent = "space-around";
  newDiv.style.height = "200px";
  newDiv.style.borderRadius = "2rem";

  const titlePlace = document.createElement("div");
  titlePlace.classList.add('title');
  titlePlace.style.fontSize = "1.75rem";
  titlePlace.textContent = `${title}`;

  const authorPlace = document.createElement("div");
  authorPlace.style.fontSize = "1rem";
  authorPlace.textContent = `Author: ${author}`;

  const pagesPlace = document.createElement("div");
  pagesPlace.textContent = `${pages} pages`;

  const readPlace = document.createElement("button");
  readPlace.classList.add("small-button");
  readPlace.addEventListener('click', toggleRead)
  readPlace.textContent = read ? "Read" : "Not Read";

  const removePlace = document.createElement('button');
  removePlace.classList.add("small-button");
  removePlace.addEventListener('click', remove)
  removePlace.textContent = "Remove";

  newDiv.appendChild(titlePlace);
  newDiv.appendChild(authorPlace);
  newDiv.appendChild(pagesPlace);
  newDiv.appendChild(readPlace);
  newDiv.appendChild(removePlace);

  bookContainer.appendChild(newDiv);
}

// Book constructor
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function addBookToLibrary(e) {
  // Prevent page reload
  e.preventDefault();

  // Check for valid input
  if (!titleEntry.checkValidity()) {
    alert("Please enter a book title.");
    return;
  }
  if (!authorEntry.checkValidity()) {
    alert("Please enter an author name.");
    return;
  }
  if (!pageEntry.checkValidity()) {
    alert("Please enter how many pages the book is.");
    return;
  }

  // Create new book with info from form
  const bookToAdd = new Book(
    titleEntry.value,
    authorEntry.value,
    pageEntry.value,
    readEntry.checked
  );

  // Add book to Library and create the card for it. This needs work...
  myLibrary.push(bookToAdd);
  addCard(bookToAdd.title, bookToAdd.author, bookToAdd.pages, bookToAdd.read);

  //Clear inputs and hide form
  titleEntry.value = "";
  authorEntry.value = "";
  pageEntry.value = "";
  readEntry.value = "";
  addBook.classList.toggle("hidden");
  heading.style.opacity = "100%";
  bookContainer.style.opacity = "100%";
}

// Allow user to toggle whether they have read a book or not.
function toggleRead(e) {
    if (e.target.textContent === 'Read') {
        e.target.textContent = 'Not Read';
        return
    }
    e.target.textContent = 'Read'
    return
}

// Allow the user to remove a book from the library
function remove(e) {
    parent = e.target.parentElement;
    console.log(parent);
    parent.style.display = 'none';

    parentTitle= parent.querySelector('.title').textContent;
    deleteBook(parentTitle);
}

// Delete the removed book from myLibrary
function deleteBook(title) {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].title === title) {
            myLibrary.splice(i);
        }
    }
}