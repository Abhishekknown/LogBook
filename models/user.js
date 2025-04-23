import fs from 'fs';
import path from 'path';

const userFilePath = path.join(process.cwd(), 'data', 'user.json');

// Helper function to handle reading from the file
function readUsersFile() {
    try {
        const data = fs.readFileSync(userFilePath, 'utf-8');
        // Ensure we return an empty array if the file is empty or doesn't contain valid JSON
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Error reading the users file:", error);
        return [];  // Return an empty array if an error occurs
    }
}

// Helper function to write to the file
function writeUsersFile(users) {
    try {
        fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2));
    } catch (error) {
        console.error("Error writing to the users file:", error);
    }
}

class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    // Static method to get all users from the file
    static allUsers() {
        return readUsersFile();
    }

    // Static method to find a user by email
    static findByEmail(email) {
        const users = User.allUsers();
        return users.find(user => user.email === email);
    }

    // Method to save the current user to the file
    save() {
        const users = User.allUsers();
        users.push(this);
        writeUsersFile(users);
    }
}

export default User;
