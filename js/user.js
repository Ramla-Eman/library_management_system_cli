const { readBooks, writeBooks } = require("./books");
const { readUsers, writeUsers } = require("./auth");

function borrowBook(userId, bookId) {
    let users = readUsers();
    let books = readBooks();

    let user = users.find(u => u.id === userId);
    let book = books.find(b => b.id === bookId);

    if (!user || !book) return console.log("⚠️ User or book not found!");
    if (book.borrowed) return console.log("❌ Book is already borrowed!");

    user.borrowedBooks.push({ id: book.id, title: book.title });
    book.borrowed = true;

    writeUsers(users);
    writeBooks(books);
    console.log(`✅ ${user.name} borrowed "${book.title}"`);
}

function returnBook(userId, bookId) {
    let users = readUsers();
    let books = readBooks();

    let user = users.find(u => u.id === userId);
    let book = books.find(b => b.id === bookId);

    if (!user || !book) return console.log("⚠️ User or book not found!");

    user.borrowedBooks = user.borrowedBooks.filter(b => b.id !== bookId);
    book.borrowed = false;

    writeUsers(users);
    writeBooks(books);
    console.log(`✅ ${user.name} returned "${book.title}"`);
}

module.exports = { borrowBook, returnBook };
