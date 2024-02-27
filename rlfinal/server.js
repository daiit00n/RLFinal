const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.set('strictQuery', true);

mongoose.connect('mongodb+srv://mcswordyt:1234@cluster0.vgkl87j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Could not connect to MongoDB Atlas', err));

const storySchema = new mongoose.Schema({
    title: String,
    content: String,
    readingTime: String
});

const Story = mongoose.model('Story', storySchema);

app.get('/api/stories', async (req, res) => {
    try {
        const stories = await Story.find();
        res.json(stories);
    } catch (error) {
        console.error('Error fetching stories:', error);
        res.status(500).json({ error: 'Error fetching stories' });
    }
});

app.get('/api/stories/:id', async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);
        if (!story) {
            return res.status(404).json({ error: 'Story not found' });
        }
        res.json(story);
    } catch (error) {
        console.error('Error fetching story:', error);
        res.status(500).json({ error: 'Error fetching story' });
    }
});

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/public/about.html');
});

app.get('/contacts', (req, res) => {
    res.sendFile(__dirname + '/public/contacts.html');
});

const port = process.env.PORT || 3000;
app.use(express.static('public'));
app.listen(port, () => console.log(`Listening on port ${port}...`));
