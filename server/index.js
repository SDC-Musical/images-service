const express = require('express');
const path = require('path');

const compression = require('compression');
const db = require('../database/index.js');
const router = require('./routes/routes.js');

const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
   extended: true
}));
const port = 3003;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(compression());
app.use('/', express.static(path.join(__dirname, '/../client/dist')));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});


// app.use('/api', router);

app.get('/api/productImages', (req, res) => {
  const id = req.query.productId;
  console.log(id)
  console.log('station 1')
  db.getProductImages(id, (err, results) => {
    if (err) {
      console.log(err);
      res.status(400).end();
    } else if (!results.length) {
      res.status(404).end();
    } else {
      res.status(200).send(results).end();
    }
  });
});

app.get('/api/productImages/read', (req, res) => {
  const id = req.query.productId;
  console.log(id)
  console.log('reading')
  db.getProductImages(id, (err, results) => {
    if (err) {
      console.log(err);
      res.status(400).end();
    } else if (!results.length) {
      res.status(404).end();
    } else {
      res.status(200).send(results).end();
    }
  });
});

app.post('/api/productImages/create', async (req, res) => {
  const image = req.body;
  const createImage = await db.create(image);
  res.end('done creating');
});


app.post('/api/productImages/update',  (req, res) => {
  const id = req.query.productId;
  const s3_url = req.query.s3_url;
  console.log('what the server got', id, s3_url)
  db.update(id, s3_url, (err, results) => {
    if (err) {
      console.log(err);
      res.status(400).end();
    } else if (!results.length) {
      res.status(404).end();
    } else {
      res.status(200).send(results).end();
    }
  });
  res.end('done updating');
});

app.get('/api/productImages/delete', async (req, res) => {
  const id = req.query.productId;
  const deleteOne = await db.deleteOne(id);
  res.end('done deleting');
})

// app.get('*', (req, res) => {
//   console.log('station 2')
//   res.sendFile(path.join(__dirname, '../client/dist/index.html'));
// });