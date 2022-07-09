import { editCb, deleteCb, imgCb } from './event-listeners-callbacks.js';

export default function createUser({ id, username, email, gender }) {
    const userContainer = document.createElement('div');
    userContainer.classList.add('user-container');
    userContainer.title = email;

    userContainer.classList.add(gender);

    const userId = document.createElement('div');
    userId.classList.add('user-id');
    userId.textContent = id;

    const usernameHeading = document.createElement('h1');
    usernameHeading.classList.add('username-heading');
    usernameHeading.textContent = username;

    const editContainer = document.createElement('div');
    editContainer.classList.add('edit-container');

    const editButton = document.createElement('div');
    editButton.classList.add('edit-button');
    editButton.textContent = 'Edit';

    const deleteButton = document.createElement('div');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Delete';

    const img = document.createElement('img');
    img.src = './imgs/edit.png';
    img.alt = 'More';

    const wrapper = document.querySelector('#wrapper');
    wrapper.classList.add('has-users');

    const userWrapper = document.createElement('div');
    userWrapper.classList.add('user-wrapper');
    wrapper.appendChild(userWrapper);

    userWrapper.appendChild(userContainer);

    [userId, usernameHeading, editContainer].forEach(el =>
        userContainer.appendChild(el)
    );

    [img, editButton, deleteButton].forEach(el =>
        editContainer.appendChild(el)
    );

    editButton.addEventListener(
        'click',
        editCb.bind(null, editButton, userContainer, id)
    );
    deleteButton.addEventListener(
        'click',
        deleteCb.bind(null, userContainer, id, username)
    );
    img.addEventListener(
        'click',
        imgCb.bind(null, editContainer, userContainer)
    );
}
