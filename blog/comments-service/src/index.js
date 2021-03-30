const express = require('express');
const {randomBytes} = require('crypto');
const cors = require('cors');
const axios = require('axios');
//REPlACED WITH Express.json
// const bodyParser = require('body-parser');
const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostID = {};

app.get('/posts/:id/comments', (req, res) => {
    res.status(200).send(commentsByPostID[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body;
    const comments = commentsByPostID[req.params.id] || [];
    console.log(comments);
    comments.push({
        id: commentId,
        content,
        status: 'pending'
    });
    commentsByPostID[req.params.id] = comments;
    console.log(commentsByPostID);

    await axios.post('http://event-bus-srv:4005/events', {
        type: 'Comment created',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'pending'
        }
    });
    res.status(201).send({});
});

app.post('/events', async (req, res) => {
    console.log('recieved event', req.body.type);
    const {type, data} = req.body;
    if (type === 'Comment moderated') {
        const {postId, id, status, content} = data;
        const comments = commentsByPostID[postId];
        const comment = comments.find((c) => {
            return c.id === id;
        });
        comment.status = status;

        await axios.post('http://event-bus-srv:4005/events', {
            type: 'Comment updated',
            data: {
                id,
                postId,
                status,
                content
            }
        });
    }
    res.send({status: "oK"});
});

app.listen(4001, () => {
    console.log('listening on 4001');
});