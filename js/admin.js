const { readBooks, writeBooks } = require("./books");
const { readUsers, writeUsers } = require("./auth");

// add book function
function addBook(title, author, year) {
  let books = readBooks();
  let newBook = { id: books.length + 1, title, author, year, borrowed: false };
  books.push(newBook);
  writeBooks(books);
  console.log(`✅ Book "${title}" addet successfully!`);
}

// remove book function
function removeBook(bookId) {
  let books = readBooks();
  let updatedBooks = books.filter((b) => b.id !== bookId);

  if (books.length === updatedBooks.length) {
    console.log("⚠️ Book not found!");
    return;
  }

  writeBooks(updatedBooks);
  console.log("✅ Book deleted successfully!");
}

// update book
function updateBook(bookId, newTitle, newAuthor) {
  let books = readBooks();
  let bookIndex = books.findIndex((b) => b.id === bookId);

  if (bookIndex === -1) {
    console.log("⚠️ Book not found!");
    return;
  }

  books[bookIndex].title = newTitle || books[bookIndex].title;
  books[bookIndex].author = newAuthor || books[bookIndex].author;

  writeBooks(books);
  console.log(`✅ ${books[bookIndex].title} Book updated successfully!`);
}

// list all books
function watchBooks() {
  let books = readBooks();
  console.log("\n📖 Registered Books");
  books.forEach((book) =>
    console.log(
      `${book.id}. ${book.title}. ${book.author} ${book.year} ${book.borrowed}`
    )
  );
}

// list all users
function listUsers() {
  let users = readUsers();
  console.log("\n👥 Registered Users:");
  users.forEach((user) =>
    console.log(`${user.id}. ${user.name} (${user.email}) - ${user.role}`)
  );
}

// delate users
function deleteUser(userId) {
  let users = readUsers();
  let updatedUsers = users.filter((u) => u.id !== userId);

  if (users.length === updatedUsers.length) {
    console.log("⚠️ User not found!");
    return;
  }

  writeUsers(updatedUsers);
  console.log("✅ User deleted successfully!");
}

module.exports = {
  addBook,
  removeBook,
  updateBook,
  watchBooks,
  listUsers,
  deleteUser,
};
