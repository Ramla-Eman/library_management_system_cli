const { readBooks, writeBooks } = require("./books");
const { readUsers, writeUsers } = require("./auth");

function addBook(title, author) {
    let books = readBooks();
    let newBook = { id: books.length + 1, title, author, borrowed: false };
    books.push(newBook);
    writeBooks(books);
    console.log(`✅ Book "${title}" added successfully!`);
}

function removeBook(bookId) {
    let books = readBooks();
    let updatedBooks = books.filter(b => b.id !== bookId);

    if (books.length === updatedBooks.length) {
        console.log("⚠️ Book not found!");
        return;
    }

    writeBooks(updatedBooks);
    console.log("✅ Book removed successfully!");
}

function listUsers() {
    let users = readUsers();
    console.log("\n👥 Registered Users:");
    users.forEach(user => console.log(`${user.id}. ${user.name} (${user.email}) - ${user.role}`));
}

function deleteUser(userId) {
    let users = readUsers();
    let updatedUsers = users.filter(u => u.id !== userId);

    if (users.length === updatedUsers.length) {
        console.log("⚠️ User not found!");
        return;
    }

    writeUsers(updatedUsers);
    console.log("✅ User deleted successfully!");
}

module.exports = { addBook, removeBook, listUsers, deleteUser };
