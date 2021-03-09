const express = require('express');
const {randomBytes} = require('crypto');
const cors = require('cors');
const axios = require('axios');
//REPlACED WITH Express.json
// const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(cors());
const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;
    posts[id] = {
        id, title
    };
    res.status(201).send(posts[id]);

    await axios.post('http://localhost:4005/events', {
        type: 'Post created',
        data: {
            id,
            title
        }
    });
});

app.post('/events', (req, res) => {
    console.log('recieved event', req.body.type);
    res.send({status: "oK"});
});
app.listen(4000, () => {
    console.log('listening on port 4000');
});


