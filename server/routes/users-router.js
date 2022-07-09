const express = require('express');
const router = express.Router();
const mysql2 = require('mysql2/promise');
const { isValidEmail, isValidUsername } = require('./validators');

let connection;

mysql2
    .createConnection({
        host: 'localhost',
        user: 'root',
        password: 'SectorG1948',
        database: 'users_fs_app',
    })
    .then(result => (connection = result));

router.get('/', async (req, res) => {
    try {
        const [userList] = await connection.query(
            'SELECT * FROM registered_users'
        );
        const count = userList.length;
        res.json({ userList, count });
    } catch (e) {
        res.json({ err: 'Technical error' });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [[user]] = await connection.query(
            'SELECT * FROM registered_users WHERE id=?',
            [id]
        );
        // ---------------------------------->
        // if (!user) {
        //     return res.json({ err: `User with id ${id} does not exists!` });
        // }
        // Валидация, която конкретно с тази имплементация на фронт-енда не е необходима.
        // ---------------------------------->
        res.json(user);
    } catch (e) {
        res.json({ err: 'Technical error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { email, userName, password, gender } = req.body;

        if (!isValidEmail(req.body.email)) {
            res.status(400).json({ err: 'Sorry, we accept only Gmail.' });
            return;
        }
        if (!isValidUsername(req.body.userName)) {
            res.status(400).json({
                err: 'Username must at least 2 characters starting with lower case letter.\nNo special symbols allowed',
            });
            return;
        }

        await connection.query(
            'INSERT INTO registered_users(email, username, password, gender) VALUES(?, ?, ?, ?)',
            [email, userName, password, gender]
        );

        res.json({ status: 'successfull' });
    } catch (e) {
        res.status(400).json({ err: e.message });
    }
});

router.put('/:id', async (req, res) => {
    const { newUserName } = req.body;
    try {
        const { id } = req.params;
        // const [ids] = await connection.query(
        //     'SELECT id FROM registered_users'
        // );
        // if (!ids.some(({ id: dbId }) => dbId === Number(id))) {
        //     res.status(400).json({
        //         err: `User with id ${id} does not exists!`,
        //     });
        //     return;
        // }
        // Горният код работи - в този случай не ми е необходим, защото username-ите ще се ъпдейтват през
        // бутон edit, който ще им взима и id-то => няма как да не съществуват.
        if (!isValidUsername(newUserName)) {
            res.status(400).json({ err: 'Invalid new username' });
            return;
        }
        const result = await connection.query(
            'UPDATE registered_users SET username = ? WHERE id = ?',
            [newUserName, id]
        );
        res.json({ succes: `${newUserName} updated!` });
    } catch (e) {
        if (e.message.includes('Duplicate entry'))
            return res.status(400).json({
                err: `Username ${newUserName} is already taken by somebody else!`,
            });
        res.status(400).json({ err: e.message });
    }
});

router.delete('/:id', async (req, res) => {
    // И тук можем да добавим валидацията за съществуващо в базата id като в PUT, но отново ще става през бутон, което изключва
    // възможността за несъществуващо такова.

    try {
        const { id } = req.params;

        await connection.query('DELETE FROM registered_users WHERE id = ?', [
            id,
        ]);

        res.json({ succes: `User with id ${id} successfully deleted` });
    } catch (e) {
        res.json({ err: 'Technical error' });
    }
});

module.exports = router;
