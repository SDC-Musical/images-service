require('newrelic');
const express = require('express');
const path = require('path');
const compression = require('compression');
const db = require('../database/index.js');
const router = require('./routes/routes.js');
// const redis = require('redis');
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));
const port = 3003;
// const client = redis.createClient(6379);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(compression());
app.use('/', express.static(path.join(__dirname, '/../client/dist')));


client.on('error', (err) => {
  console.log("Error " + err);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});


// app.use('/api', router);
// let checkCache = (req, res, next) => {
//   const { id } = req.query.productId;
//   client.get(id, (err, data) => {
//     if (err) {
//     } if (data) {
//       console.log('data', data);
//       res.status(200).send(data);
//     } else {
//       next();
//     }
//   })
// }



// app.get('/api/productImages', checkCache, (req, res) => {
//   // app.get('/api/productImages', () => {
//     const id = req.query.productId;
//     try {
//       if (id > 10000000 || typeof Number(id) !== 'number') {
//         console.log(1);
//         res.status(404).send('invalid id');
//       }
//       else {
//         //below function needs callback
//         db.getProductImages(id, (err, results) => {
//           if (err) {
//             console.error(err);
//             console.log(2);
//             res.status(500).json({
//             status: "Failed",
//           })
//         } else {
//           console.log('results', results[0].s3_url);
//           let productImage = results[0].s3_url;
//           console.log('productImage', productImage);
//           client.setex(id, 3600, JSON.stringify(productImage));
//           console.log(3);
//           res.json({
//             status: 'Success',
//             data: productImage
//           });
//         }
//       });
//     }
//   } catch (error) {
//     console.log(4);
//     console.error(error);
//     res.status(500).json({
//       status: "Failed",
//     });
//   }
// });




// app.get('/api/productImages', (req, res) => {
//   const id = req.query.productId;
//   console.log(id)
//   console.log('station 1')
//   db.getProductImages(id, (err, results) => {
//     if (err) {
//       console.log(err);
//       res.status(400).end();
//     } else if (!results.length) {
//       res.status(404).end();
//     } else {
//       res.status(200).send(results).end();
//     }
//   });
// });

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
