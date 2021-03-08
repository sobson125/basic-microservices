const express = require('express');
const {randomBytes} = require('crypto');
const cors = require('cors');

//REPlACED WITH Express.json
// const bodyParser = require('body-parser');
const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostID = {};

app.get('/posts/:id/comments', (req, res) => {
    res.status(200).send(commentsByPostID[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body;
    const comments = commentsByPostID[req.params.id] || [];
    comments.push({id: commentId, content});
    commentsByPostID[req.params.id] = comments;
    res.status(201).send(comments);
});

app.listen(4001, () => {
    console.log('listening on 4001');
});