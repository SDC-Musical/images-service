const mysql = require('mysql');
const mysqlConfig = require('./config.example.js');
const hardCode = require('./hardCode.js');

const connection = mysql.createConnection(mysqlConfig);

const getProductImages = (productId, callback) => {
  const q = `SELECT * FROM product_images WHERE product_id = ${productId}`;

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

  connection.query(createOne, [incImage], (err, results) => {
    if (err) {
      console.log('ERROR when inserting new image in DB');
    } else {
      console.log(null, 'Inserted new image in DB');
    }
  })
};

const read = (id) => {
  const readOne = 'SELECT * FROM product_images WHERE product_id = ?';

  connection.query(readOne, [id], (err, results) => {
    if (err) {
      console.log(`ERROR when reading ${id}'s image in DB`);
    } else {
      console.log(null, results);
    }
  })
}

const update = (id, data) => {
  const updateImage = 'UPDATE product_images SET s3_url = ? WHERE product_id = ?';

  connection.query(updateImage, [data, id], (err, results) => {
    if (err) {
      console.log(`ERROR when updating image ${id} in DB`);
    } else {
      console.log(null, results);
    }
  });
};

const deleteOne = (id) => {
  const deleteOneImage = 'DELETE FROM product_images WHERE product_id = ?';

  connection.query(deleteOneImage, [id], (err, results) => {
    if (err) {
      console.log(`ERROR when deleting review ${id} in DB`);
    } else {
      console.log(null, 'Review has been deleted, yee haw partner');
    }
  })
};


module.exports = { getProductImages, create, read, deleteOne,update };
