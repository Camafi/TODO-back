const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
var logger = require('morgan');
var PostgresStore = require('./utils/PostgresStore.js');
var cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser(bodyParser.json()));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// let TODO = [
//   {
//     id: 1,
//     name: 'shopping',
//     thing: 'go shopping for food'
//   },
//   {
//     id: 2,
//     name: 'clean',
//     thing: 'clean the appartement'
//   },
//   {
//     id: 3,
//     name: 'exercise',
//     thing: 'do exercises daily'
//   }

// ];
PostgresStore.reset();

const modelTODO = require('./models/TODO.js');

app.get('/TODO', async function (req, res) {
  const TODO = await modelTODO.GetAll();
  res.send(TODO);
});

app.post('/TODO', async (req, res) => {
  const oneTODO = req.body;
  await modelTODO.create(oneTODO);
  res.sendStatus(200);
});

app.delete('/TODO/:id', async (req, res) => {
  const TODOId = parseInt(req.params.id);
  await modelTODO.DeleteById(TODOId);
  res.sendStatus(200);
});

app.listen(3001);
