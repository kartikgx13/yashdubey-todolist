const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { TodoModel, TodoSchema } = require('./Models/todos');
//const path = require('path')

//const __dirname = path.resolve();
const app = express();

//app.use(express.static(path.join(__dirname, '../client')));
//app.get('*', (req, res) => {
//    res.sendFile(path.join(__dirname, '../client', 'index.html'));
//});
//
//app.use(express.static(path.join(__dirname, '/client/dist')));
//
//app.get('*', (req, res) => {
//  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
//});

app.use(express.json());

mongoose.connect("mongodb+srv://admin:logindemo@cluster0.0d144qt.mongodb.net/YASH_DB?retryWrites=true&w=majority")
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));





app.get('/api/get', (req,res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err)) 
})

app.put('/api/update/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndUpdate({_id: id}, {done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
});

app.delete('/api/delete/:id', (req,res) => {
    const {id} = req.params
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})


app.post('/api/add', (req, res) => {
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
