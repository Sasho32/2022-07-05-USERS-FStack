import getUsers from './get-users.js';
import createUser from './create-user.js';

async function main() {
    document.body.style.display = 'flex';

    const { userList, count } = await getUsers();

    if (count) {
        const noUsersHeading = document.querySelector('h1#no-users-heading');
        noUsersHeading.remove();

        document.body.style.justifyContent = 'flex-start';

        userList.forEach(user => createUser(user));
    }
}

fetch('http://localhost:3000/test')
    .then(response => {
        main();
    })
    .catch(e => {
        window.location.href = './error.html';
    });
