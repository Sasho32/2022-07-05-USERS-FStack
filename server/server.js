function app() {
    const express = require('express');
    const app = express();
    const cors = require('cors');

    app.use(
        cors({
            origin: '*',
        })
    );

    app.use(express.json());

    app.get('/test', (req, res) => {
        res.send('success');
    });

    app.use('/users', require('./routes/users-router'));

    app.listen(3000, () => {
        console.log('Server is up and running on port 3000...');
    });
}

app();
