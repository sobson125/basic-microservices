const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    console.log('recieved event', req.body.type);

    const {type, data} = req.body;

    if (type === 'Post created') {
        const {id, title} = data;
        posts[id] = {id, title, comments: []};
    }
    if (type === 'Comment created') {
        const {id, postId, content, status} = data;
        const post = posts[postId];
        console.log(status);
        post.comments.push({id, content, status});
    }
    if (type === 'Comment updated') {
        const {id, content, postId, status} = data;
        const post = posts[postId];
        console.log(post);
        const comment = post.comments.find(comment => comment.id === id);
        comment.status = status;
        comment.content = content;
    }
    res.send({});
});

app.listen(4002, () => {
    console.log('listening on 4002');
});