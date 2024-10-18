class User {
    constructor(name, age, email) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.online = false;
    }
}


User.prototype.login = function(user) {
    console.log(`${user} is logged in`);
    return this;
}

User.prototype.logout = function(user) {
    console.log(`${user} is logged out`);
    return this;
}

const hi = function(name) {
    console.log("hi there", name);
}

export function* idGenerator() {
    while(true) {
        yield new Date().toISOString()
    }
}

export default User;
export {hi};
