
CREATE DATABASE IF NOT EXISTS images_service;

USE images_service;



CREATE TABLE IF NOT EXISTS product_images (
  id int NOT NULL AUTO_INCREMENT,
  product_id int NOT NULL,
  s3_url VARCHAR (255) NOT NULL,
  PRIMARY KEY (id)
);

-- LOAD DATA LOCAL INFILE '/Users/sinamb/Documents/Programs/images-service/data.csv'
LOAD DATA LOCAL INFILE '../data.csv'
INTO TABLE product_images
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(id, product_id, s3_url);


/*
 *    mysql -u root < database/mysql_seeder.sql
 */