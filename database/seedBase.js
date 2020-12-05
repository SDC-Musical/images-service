
const fs = require("fs");

const writeImages = fs.createWriteStream('./data.csv');
writeImages.write('id,product_id,s3_url\n', 'utf8');

const iPP1 = {
  1: 4, 2: 13, 3: 7, 4: 1, 5: 12, 6: 3, 7: 12, 8: 6, 9: 5, 10: 10,
};
const iPP2 = {
  11: 2, 12: 11, 13: 1, 14: 8, 15: 6, 16: 9, 17: 9, 18: 13, 19: 6, 20: 8,
};
const iPP3 = {
  21: 10, 22: 7, 23: 6, 24: 4, 25: 8, 26: 4, 27: 12, 28: 15, 29: 3, 30: 6,
};
const iPP4 = {
  31: 2, 32: 5, 33: 7, 34: 7, 35: 7, 36: 11, 37: 2, 38: 9, 39: 8, 40: 12,
};
const iPP5 = {
  41: 4, 42: 9, 43: 12, 44: 1, 45: 6, 46: 4, 47: 11, 48: 13, 49: 3, 50: 15,
};

const imagesPerProduct = {
  ...iPP1,
  ...iPP2,
  ...iPP3,
  ...iPP4,
  ...iPP5,
};


function writeTenMillionImages(writer, encoding, callback) {
  let i = 10000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const product_id = id;
      const s3_url = `url.${id}/image_.png`;
      const data = `null,${product_id},${s3_url}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
// see if we should continue, or wait
// don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
// had to stop early!
// write some more once it drains
      writer.once('drain', write);
    }
  }
write()
}
writeTenMillionImages(writeImages, 'utf-8', () => {
  writeImages.end();
});