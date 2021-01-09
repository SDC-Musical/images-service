const mysql = require('mysql');
const mysqlConfig = require('./config.example.js');
const hardCode = require('./hardCode.js');

const connection = mysql.createConnection(mysqlConfig);

const getProductImages = (productId, callback) => {
  const q = `SELECT * FROM product_images WHERE id = ${productId}`;
  console.log(productId)
  connection.query(q, (err, results) => {
    if (err) {
      console.log('getProductImages error');
      if (productId === 1) {
        console.log('Falling back on hardcoded data for id 1');
        callback(null, hardCode.iD1);
      }
      if (productId === 2) {
        console.log('Falling back on hardcoded data for id 3');
        callback(null, hardCode.iD2);
      } else {
        callback(err, null);
      }
    } else {
      console.log(results)
      callback(null, results);
    }
  });
};


const create = (incImage) => {
  const createOne = 'INSERT INTO product_images SET ?';
  console.log(incImage);
  connection.query(createOne, incImage, (err, results) => {
    if (err) {
      console.log(err);
      console.log('ERROR when inserting new image in DB');
    } else {
      console.log(null, 'Inserted new image in DB');
    }
  })
};

// const read = (id, callback) => {
//   console.log('reader')
//   const readOne = 'SELECT * FROM product_images WHERE product_id = ?';

//   connection.query(readOne, [id], (err, results) => {
//     if (err) {
//       console.log(`ERROR when reading ${id}'s image in DB`);
//     } else {

//       console.log(null, results);
//       callback(null, results);
//     }
//   })
// }

const update = (id, url, callback) => {
  const updateImage = 'UPDATE product_images SET s3_url = ? WHERE id = ?';

  connection.query(updateImage, [url, id], (err, results) => {
    if (err) {
      console.log(`ERROR when updating image ${id} in DB`);
    } else {
      console.log(null, results);
      callback(null, results);
    }
  });
};

const deleteOne = (id) => {
  const deleteOneImage = 'DELETE FROM product_images WHERE id = ?';

  connection.query(deleteOneImage, [id], (err, results) => {
    if (err) {
      console.log(`ERROR when deleting review ${id} in DB`);
    } else {
      console.log(null, 'done deleting');
    }
  })
};


module.exports = { getProductImages, create, deleteOne,update };
