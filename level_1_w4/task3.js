function Chat() {
    let users = '';
    let usersOnline = 0;
    let usersLogIN = 0;

    const checkOnline = (user) => {
        return new RegExp(`${user}\\s`, 'g').test(users);
    }

    function login(id) {
        if (!checkOnline(id)) {
            users += `${id} `;
            usersOnline++;
            usersLogIN++;
        }
    }

    function logout(id) {
        if (checkOnline(id)) {
            users = users.replace(new RegExp(`${id}\\s`, 'g'), '');
            usersOnline--;
        }
    }

    function isOnline(id) {
        return checkOnline(id);
    }

    function countOnline() {
        return usersOnline;
    }

    function countLogins() {
        return usersLogIN;
    }

    return {
        login,
        logout,
        isOnline,
        countOnline,
        countLogins
    }
}

const myChat = Chat();
myChat.login(3);
myChat.login(2);
myChat.logout(3);
console.log(myChat.countOnline()); // 1
