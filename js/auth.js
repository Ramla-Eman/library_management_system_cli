const fs = require("fs");
const filePath = "./data/users.json";

function readUsers() {
    if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, "[]");
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeUsers(users) {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

function signup(name, email, password) {
    let users = readUsers();

    if (users.some(user => user.email === email)) {
        console.log("⚠️ User already exists!");
        return;
    }

    let newUser = { id: users.length + 1, name, email, password, borrowedBooks: [] };
    users.push(newUser);
    writeUsers(users);
    console.log("✅ User registered successfully!");
}

module.exports = { signup, readUsers, writeUsers };
