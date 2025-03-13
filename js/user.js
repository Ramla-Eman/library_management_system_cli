const { readBooks, writeBooks } = require("./books");
const { readUsers, writeUsers } = require("./auth");

// handling borrow book function
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

// handling return book function
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

// function for checking how many books that i borrowed
function listYourBooks(userId) {
    let users = readUsers();
    let user = users.find(u => u.id === userId);

    if (!user) return console.log("⚠️ User not found!");

    console.log(`\n📚 ${user.name}'s Borrowed Books:`);
    if (user.borrowedBooks.length === 0) {
        console.log("📌 No books borrowed yet.");
    } else {
        user.borrowedBooks.forEach(book => console.log(`- ${book.title} (ID: ${book.id})`));
    }
}

module.exports = { borrowBook, returnBook, listYourBooks };
