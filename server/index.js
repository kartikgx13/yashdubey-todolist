const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { TodoModel, TodoSchema } = require('./Models/todos');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/test1', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.get('/get', (req,res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err)) 
})

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndUpdate({_id: id}, {done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
});

app.delete('/delete/:id', (req,res) => {
    const {id} = req.params
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})


app.post('/add', (req, res) => {
  const task = req.body.task;
  console.log('Received task:', task);

  TodoModel.create({
    task: task
  }).then(result => {
    console.log('Data inserted:', result);
    res.json(result);
  }).catch(err => {
    console.error('Error inserting data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  });
});

app.listen(3000, () => {
  console.log("Server is Running");
});
