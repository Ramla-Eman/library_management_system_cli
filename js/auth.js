const fs = require("fs");
const filePath = "./data/users.json";

function readUsers() {
    if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, "[]");
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeUsers(users) {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

// 📌 Signup function
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

// 🔐 Login function
function login(email, password) {
    let users = readUsers();
    let user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        console.log("❌ Invalid email or password!");
        return null;
    }

    console.log(`✅ Welcome, ${user.name}!`);
    return user;
}

module.exports = { signup, login, readUsers, writeUsers };
