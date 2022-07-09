import getUsersCount from './get-users-count.js';

function main() {
    document.body.style.display = 'flex';

    getUsersCount();

    const form = document.querySelector('form');

    const [emailField, usernameField, passwordField] = Array.from(
        document.getElementsByTagName('input')
    );

    form.addEventListener('submit', async e => {
        e.preventDefault();

        const [genderField] = Array.from(
            document.querySelector('div.gender').querySelectorAll('input')
        ).filter(field => field.checked);

        const { value: email } = emailField;
        const { value: userName } = usernameField;
        const { value: password } = passwordField;
        const { value: gender } = genderField;

        try {
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    userName,
                    password,
                    gender,
                }),
            });

            if (response.status === 400) {
                let { err } = await response.json();
                if (err.includes('Duplicate entry')) {
                    err = err.replace(`Duplicate entry '`, '');
                    err = err.replace(
                        `' for key 'registered_users.username'`,
                        ''
                    );
                    if (err.includes('@'))
                        return alert(
                            `User with email ${email} is already registered!`
                        );

                    return alert(
                        `User with username ${userName} is already registered!`
                    );
                }
                return alert(err);
            }

            alert(`User ${userName} was successfully created!`);
        } catch (e) {
            alert('Technical error! Probably server is down...');
        }
        window.location.reload();
    });
}

fetch('http://localhost:3000/test')
    .then(response => {
        main();
    })
    .catch(e => {
        window.location.href = './error.html';
    });
