const fs = require("fs");
const filePath = "./data/books.json";

function readBooks() {
    if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, "[]");
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeBooks(books) {
    fs.writeFileSync(filePath, JSON.stringify(books, null, 2));
}

function listBooks() {
    let books = readBooks();
    console.log("📖 Available Books:");
    books.forEach(book => {
        console.log(`${book.id}. ${book.title} - ${book.author} ${book.borrowed ? "(Borrowed)" : ""}`);
    });
}

module.exports = { listBooks, readBooks, writeBooks };
