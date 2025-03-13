const fs = require("fs");
const filePath = "./data/books.json";

// function for reading books
function readBooks() {
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, "[]");
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

// write books function
function writeBooks(books) {
  fs.writeFileSync(filePath, JSON.stringify(books, null, 2));
}

// checking how many books are available
function listBooks() {
  let books = readBooks();
  console.log("📖 Available Books:");
  books.forEach((book) => {
    console.log(
      `${book.id}. ${book.title} - ${book.author} ${
        book.borrowed ? "(Borrowed)" : ""
      }`
    );
  });
}

module.exports = { listBooks, readBooks, writeBooks };
