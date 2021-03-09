const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/events', async (req, res) => {
    console.log('recieved event', req.body.type);
    const {type, data} = req.body;
    if (type === 'Comment created') {
        const status = data.content.includes('orange') ? 'rejected' : 'approved';
        await axios.post('http://localhost:4005/events', {
            type: 'Comment moderated',
            data: {
                id: data.id,
                postId: data.postId,
                content: data.content,
                status
            }
        });
    }
    res.send({});
});


app.listen(4006, () => {
    console.log('running on 4006');
});