const readline = require("readline");
const { signup, login, readUsers } = require("./js/auth");
const { listBooks } = require("./js/books");
const { borrowBook, returnBook } = require("./js/user");
const {
  addBook,
  removeBook,
  updateBook,
  watchBooks,
  listUsers,
  deleteUser,
} = require("./js/admin");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 🛠️ Admin Panel
function adminMenu() {
  console.log("\n🛠️ Admin Panel");
  console.log("1. Add Book");
  console.log("2. Remove Book");
  console.log("3. Update Book");
  console.log("4. List Books");
  console.log("5. View Users");
  console.log("6. Delete User");
  console.log("7. Exit");

  rl.question("Select an option: ", (option) => {
    switch (option) {
      case "1":
        rl.question("Enter book title: ", (title) => {
          rl.question("Enter author: ", (author) => {
            rl.question("Enter publication year: ", (year) => {
              addBook(title, author, year);
              adminMenu();
            });
          });
        });
        break;
      case "2":
        rl.question("Enter book ID to remove: ", (bookId) => {
          removeBook(parseInt(bookId));
          adminMenu();
        });
        break;
      case "3":
        rl.question("Enter book ID to update: ", (bookId) => {
          rl.question("Enter new title (press Enter to skip): ", (newTitle) => {
            rl.question(
              "Enter new author (press Enter to skip): ",
              (newAuthor) => {
                rl.question(
                  "Enter new publication year (press Enter to skip): ",
                  (newYear) => {
                    updateBook(
                      parseInt(bookId),
                      newTitle || null,
                      newAuthor || null,
                      newYear || null
                    );
                    adminMenu();
                  }
                );
              }
            );
          });
        });
        break;
      case "4":
        watchBooks();
        adminMenu();
        break;
      case "5":
        listUsers();
        adminMenu();
        break;
      case "6":
        rl.question("Enter user ID to delete: ", (userId) => {
          deleteUser(parseInt(userId));
          adminMenu();
        });
        break;
      case "7":
        console.log("📌 Exiting admin panel.");
        mainMenu();
        break;
      default:
        console.log("⚠️ Invalid option! Try again.");
        adminMenu();
    }
  });
}

// 📌 Main Menu
function mainMenu() {
  console.log("\n📚 Library Management System");
  console.log("1. Sign Up");
  console.log("2. Log In");
  console.log("3. List Books");
  console.log("4. Borrow Book");
  console.log("5. Return Book");
  console.log("6. Admin Panel");
  console.log("7. Exit");

  rl.question("Select an option: ", (option) => {
    switch (option) {
      case "1":
        rl.question("Enter your name: ", (name) => {
          rl.question("Enter email: ", (email) => {
            rl.question("Enter password: ", (password) => {
              signup(name, email, password);
              mainMenu();
            });
          });
        });
        break;
      case "2":
        rl.question("Enter email: ", (email) => {
          rl.question("Enter password: ", (password) => {
            let user = login(email, password);
            if (user) {
              console.log("🎉 Login Successful!");
            }
            mainMenu();
          });
        });
        break;
      case "3":
        listBooks();
        mainMenu();
        break;
      case "4":
        rl.question("Enter your user ID: ", (userId) => {
          rl.question("Enter book ID to borrow: ", (bookId) => {
            borrowBook(parseInt(userId), parseInt(bookId));
            mainMenu();
          });
        });
        break;
      case "5":
        rl.question("Enter your user ID: ", (userId) => {
          rl.question("Enter book ID to return: ", (bookId) => {
            returnBook(parseInt(userId), parseInt(bookId));
            mainMenu();
          });
        });
        break;
      case "6":
        rl.question("Enter Admin Email: ", (email) => {
          rl.question("Enter Admin Password: ", (password) => {
            let users = readUsers();
            let admin = users.find(
              (u) =>
                u.email === email &&
                u.password === password &&
                u.role === "admin"
            );
            if (admin) {
              console.log("✅ Admin logged in!");
              adminMenu();
            } else {
              console.log("❌ Invalid admin credentials!");
              mainMenu();
            }
          });
        });
        break;
      case "7":
        console.log("📌 Exiting the system.");
        rl.close();
        break;
      default:
        console.log("⚠️ Invalid option! Try again.");
        mainMenu();
    }
  });
}

mainMenu();
