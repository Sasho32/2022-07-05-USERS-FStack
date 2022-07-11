import getUserNameById from './get-username-by-id.js';

// ---------------------------------->

async function setFetchedUserName(userContainer, id) {
    const username = await getUserNameById(id);

    const usernameHeading = document.createElement('h1');
    usernameHeading.classList.add('username-heading');
    usernameHeading.textContent = username;

    userContainer.appendChild(usernameHeading);
}

async function hideOptions(userContainer) {
    const editBtn = userContainer
        .querySelector('div.edit-container')
        .querySelector('div.edit-button');

    if (editBtn.textContent === 'Confirm') {
        const { textContent: id } = userContainer.querySelector('div.user-id');

        await setFetchedUserName(userContainer, id);

        userContainer.querySelector('input').remove();

        editBtn.textContent = 'Edit';
    }

    userContainer
        .querySelector('div.edit-container')
        .classList.remove('active');
}

// ---------------------------------->

export async function editCb(editButton, userContainer, id) {
    try {
        if (editButton.textContent === 'Confirm') {
            const input = userContainer.querySelector('input');
            const { value: newUserName } = input;

            const response = await fetch(`http://localhost:3000/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newUserName }),
            });

            if (response.status === 400) {
                const { err } = await response.json();
                return alert(err);
            }

            editButton.textContent = 'Edit';
            input.remove();
            setFetchedUserName(userContainer, id);
            return;
        }

        const usernameHeading = userContainer.querySelector(
            'h1.username-heading'
        );
        usernameHeading.remove();

        const input = document.createElement('input');
        input.value = await getUserNameById(id);
        // input.focus(); не работи
        userContainer.appendChild(input);

        editButton.textContent = 'Confirm';
    } catch (e) {
        window.location.href = './error.html';
    }
}

export async function deleteCb(userContainer, id) {
    try {
        await fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE',
        });

        userContainer.closest('div.user-wrapper').remove();

        if (!document.querySelector('#wrapper').childElementCount)
            window.location.reload();
    } catch (e) {
        window.location.href = './error.html';
    }
}

export function imgCb(editContainer, userContainer) {
    editContainer.classList.toggle('active');

    let userContainersWithHiddenEdit = Array.from(
        document.querySelectorAll('div.user-container')
    );

    if (editContainer.classList.contains('active')) {
        userContainersWithHiddenEdit = userContainersWithHiddenEdit.filter(
            current => current !== userContainer
        );
    }

    userContainersWithHiddenEdit.forEach(current => {
        hideOptions(current);
    });
}
