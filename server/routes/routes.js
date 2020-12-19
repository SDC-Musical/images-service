// const express = require('express');

// const db = require('/Users/sinamb/Documents/Programs/images-service/database/index.js');
// const router = express.Router();

// router.get('/product/quotes', db.getProductImages);

// router.post('/product/prices', db.create);
// router.post('/product/sellers', db.read);

// router.delete('/product/prices', db.update);
// router.delete('/product/sellers', db.deleteOne);

// module.exports = router;


// app.listen(port, () => {
//   console.log(`listening on port ${port}`);
// });

// app.get('/api/productImages', (req, res) => {
//   const id = req.query.productId;
//   console.log('got here');
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

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/dist/index.html'));
// });


// app.post('/api/productImages/create', async (req, res) => {
//   const image = req.body.image;
//   const createImage = await db.create(image);
//   res.end('done creating');
// });

// app.get('/api/productImages/read', async (req, res) => {
//   console.log('read')
//   const id = req.query.productId;
//   const readOne = await db.read(id);
//   console.log(readOne)
//   res.send(readOne);
// });

// app.post('/api/productImages/update', async (req, res) => {
//   const id = req.query.productId;
//   const update = req.body.update;
//   const updateOne = await db.update(id, update);
//   res.end('done updating');
// });

// app.get('/api/productImages/delete', async (req, res) => {
//   const id = req.query.productId;
//   const deleteOne = await db.deleteOne(id);
//   res.end('done deleting');
// })