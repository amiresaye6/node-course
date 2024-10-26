class User {
    constructor(userName, email) {
        this.userName = userName
        this.email = email
        this.score = 0;
    }

    login() {
        console.log(this.userName , "just logged in")
        // this returns the object to allow for method chainning
        return this;
    }
    
    signup() {
        console.log(this.userName , "just logged out")
        return this;
    }
    

    updateScore() {
        this.score++
        console.log(`${this.userName} score is now ${this.score} and email is ${this.email}`);
        return this;
    }
}

var userOne = new User('amir', 'amir@gmail.com')
var userTwo = new User('botato', 'botatoChips@gmail.com')

// METHOD CHAINNING
// userTwo.updateScore()
// userOne.login().signup().login().updateScore().updateScore().updateScore().updateScore()


class Admin extends User {
    // herew we diding creat a constructor function, so the class Admin will user the 
    // constructor of the User class
    deleteUser(user) {
        users = users.filter(u => u.email != user.email)
    }
}

const adminUser = new Admin("amirAdmin", 'admin@gmail.com');

var users = [userOne, userTwo, adminUser]

// adminUser.deleteUser(userTwo);

// console.log(users);
// adminUser.deleteUser(userOne);

// console.log(users);


// constructors under the hood

function UserC(email, usrName) {
    this.email = email;
    this.userName = usrName;
    this.online = false;
    this.login = function() {
        console.log(this.email, this.userName);
        return this;
    }
}



// using prototypes

UserC.prototype.login = function() {
    this.online = true;
    console.log("user is onlile: ", this.email);
}

UserC.prototype.logout = function() {
    this.online = false;
    console.log("user is offline: ", this.email);
}

function AdminC(...args) {
    // console.log(args);
    // calling the userc function to simulate the inheritance stuff
    UserC.apply(this, args)
    this.role = 'super admin';
}


AdminC.prototype = Object.create(UserC.prototype)


AdminC.prototype.deleteUser = function(user) {
    users = users.filter(u => u.email != user.email)
}
