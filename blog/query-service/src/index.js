const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

const handleEvent = (type, data) => {
    if (type === 'Post created') {
        const {id, title} = data;
        posts[id] = {id, title, comments: []};
        console.log(posts[id]);
    }
    if (type === 'Comment created') {
        console.log('im here created');
        const {id, postId, content, status} = data;
        const post = posts[postId];
        console.log(status);
        post.comments.push({id, content, status});
    }
    if (type === 'Comment updated') {
        console.log('im here updated');
        const {id, content, postId, status} = data;
        const post = posts[postId];
        console.log(post);
        const comment = post.comments.find((c) => {
            return c.id === id;
        });
        console.log(comment);
        comment.status = status;
        comment.content = content;
    }
};

app.post('/events', (req, res) => {
    console.log('recieved event', req.body.type);

    const {type, data} = req.body;
    handleEvent(type, data);
    res.send({});
});

app.listen(4002, async () => {
    console.log('listening on 4002');
    const response = await axios.get('http://event-bus-srv:4005/events')
    for (let event of response.data) {
        console.log('proccesing event');
        handleEvent(event.type, event.data);
    }

});