const express = require('express');
const {randomBytes} = require('crypto');
const cors = require('cors');
//REPlACED WITH Express.json
// const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(cors());
const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;
    posts[id] = {
        id, title
    };
    res.status(201).send(posts[id]);
});

app.listen(4000, () => {
    console.log('listening on port 4000');
});


