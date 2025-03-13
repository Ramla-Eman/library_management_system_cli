const fs = require("fs");
const filePath = "./data/users.json";

// function for reading users
function readUsers() {
    if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, "[]");
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

// function for write users
function writeUsers(users) {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

// signup function
function signup(name, email, password) {
    let users = readUsers();

    if (users.some(user => user.email === email)) {
        console.log("⚠️ User already exists!");
        return;
    }

    let role = "user";

    let newUser = { id: users.length + 1, name, email, password, role, borrowedBooks: [] };
    users.push(newUser);
    writeUsers(users);
    console.log("✅ User registered successfully!");
}

// login function
function login(email, password, role) {
    let users = readUsers();
    let user = users.find(user => user.email === email && user.password === password && user.role === user);

    if (!user) {
        console.log("❌ Invalid email or password!");
        return null;
    }

    console.log(`✅ Welcome, ${user.name}!`);
    return user;
}

module.exports = { signup, login, readUsers, writeUsers };
