import fs from 'fs';
import path from 'path';

const userFilePath = path.join(process.cwd(), 'data', 'user.json');

// Helper to read all users

function readUsersFile(){
    try{
        const data = fs.readFileSync(userFilePath, 'utf-8');

        // If the file has something inside, convert if from text to an array/object 

        if(data){
            return JSON.parse(data);
        }else{
            // If File is empty just return an empty array
            return [];
        }

    }catch(error){
        console.error('Could not read users file', error);

        return [];
    }
}

class User{
    constructor(name, email, password){
        this.name = name ;
        this.email = email;
        this.password = password;
    }

    // Read all users
    static allUsers(){
        return readUsersFile();
    }

    // Write all users back to file 
    static saveAll(users){
        try{
            fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2));

        }catch(error){
            console.error('Error Writing users file', error);
        }
    }

    //Static(insert) the current instance to user.json
    save(){
        console.log('test')
        const users = User.allUsers();
        users.push(this);
        User.saveAll(users)
        console.log('test')
    }

    static findByEmail(email) {
        const users = User.allUsers();
        return users.find(user => user.email === email);
    }

    // Check paswoedk

    static checkPassword(email, password){
        const user = user.findByEmail(email);
        if(!user) return false;
        return user.password = password;
    }

    //  Static helper to add a new user directly 
    static addUser(name, email, password){
        const users = User.allUsers();

        // Optional:Prevent duplicate email
        const existingUser = users.find(user => user.email === email)

        if(existingUser){
            throw new Error('User with the email already exists');
        }
        console.log('test')

        const newUser = new User(name, email, password);
        users.push(newUser);
        User.saveAll(users);
        return newUser;

    }
    
}


export default User;