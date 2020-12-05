const mysql = require('mysql');
const request = require('supertest');
const config = require('../../database/config.example.js');
const app = require('./server.js');

const connection = mysql.createConnection(config);
const port = 3033;

describe('Server Tests', () => {
  beforeAll((done) => {
    app.listen(port, () => {
      console.log(`listening for tests on port ${port}`);
      done();
    });
  });

  it('should send 200 code on success', (done) => {
    request(app)
      .get('/api/productImages?productId=1')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  it('should send 404 code when images are not found', (done) => {
    request(app)
      .get('/api/productImages?productId=1011')
      .then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });

  it('should receive an array of correct length for a given id', (done) => {
    const q = 'SELECT * FROM product_images WHERE product_Id = 20';
    connection.query(q, (err, data) => {
      if (err) {
        console.log('mysql error in test 3');
      }
      request(app)
        .get('/api/productImages?productId=20')
        .then((response) => {
          expect(response.body.length).toBe(data.length);
          done();
        });
    });
  });
});
