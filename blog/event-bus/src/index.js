const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const events = [];

app.get('/events', (req, res) => {
    res.send(events);
});


app.post('/events', async (req, res) => {
    const event = req.body;
    events.push(event);
    await axios.post('http://posts-clusterip-srv:4000/events', event).catch((err) => {
        console.log(err);
    });
    await axios.post('http://comments-srv:4001/events', event).catch((err) => {
        console.log(err);
    });
    await axios.post('http://query-srv:4002/events', event).catch((err) => {
        console.log(err);
    });
    await axios.post('http://moderation-srv:4006/events', event).catch((err) => {
        console.log(err);
    });
    res.send({status: 'OK'});
});

app.listen(4005, () => {
    console.log('listening on 4005');
});