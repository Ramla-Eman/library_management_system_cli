const readline = require("readline");
const { signup } = require("./js/auth");
const { listBooks } = require("./js/books");
const { borrowBook, returnBook } = require("./js/user");
const { addBook, removeBook, listUsers, deleteUser } = require("./js/admin");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function adminMenu() {
    console.log("\n🛠️ Admin Panel");
    console.log("1. Add Book");
    console.log("2. Remove Book");
    console.log("3. View Users");
    console.log("4. Delete User");
    console.log("5. Exit");

    rl.question("Select an option: ", option => {
        switch (option) {
            case "1":
                rl.question("Enter book title: ", title => {
                    rl.question("Enter author: ", author => {
                        addBook(title, author);
                        adminMenu();
                    });
                });
                break;
            case "2":
                rl.question("Enter book ID to remove: ", bookId => {
                    removeBook(parseInt(bookId));
                    adminMenu();
                });
                break;
            case "3":
                listUsers();
                adminMenu();
                break;
            case "4":
                rl.question("Enter user ID to delete: ", userId => {
                    deleteUser(parseInt(userId));
                    adminMenu();
                });
                break;
            case "5":
                console.log("📌 Exiting admin panel.");
                mainMenu();
                break;
            default:
                console.log("⚠️ Invalid option! Try again.");
                adminMenu();
        }
    });
}

function mainMenu() {
    console.log("\n📚 Library Management System");
    console.log("1. Sign Up");
    console.log("2. List Books");
    console.log("3. Borrow Book");
    console.log("4. Return Book");
    console.log("5. Admin Panel");
    console.log("6. Exit");

    rl.question("Select an option: ", option => {
        switch (option) {
            case "1":
                rl.question("Enter your name: ", name => {
                    rl.question("Enter email: ", email => {
                        rl.question("Enter password: ", password => {
                            signup(name, email, password);
                            mainMenu();
                        });
                    });
                });
                break;
            case "2":
                listBooks();
                mainMenu();
                break;
            case "3":
                rl.question("Enter your user ID: ", userId => {
                    rl.question("Enter book ID to borrow: ", bookId => {
                        borrowBook(parseInt(userId), parseInt(bookId));
                        mainMenu();
                    });
                });
                break;
            case "4":
                rl.question("Enter your user ID: ", userId => {
                    rl.question("Enter book ID to return: ", bookId => {
                        returnBook(parseInt(userId), parseInt(bookId));
                        mainMenu();
                    });
                });
                break;
            case "5":
                rl.question("Enter Admin Email: ", email => {
                    rl.question("Enter Admin Password: ", password => {
                        let users = require("./js/auth").readUsers();
                        let admin = users.find(u => u.email === email && u.password === password && u.role === "admin");
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
            case "6":
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
