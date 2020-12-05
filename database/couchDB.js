/*COUCHDB setup because I know I will forget:

Using couchimport module to bring in the generated CSV.
Using port 5984, DB is IMAGES
Don’t forget admin and password have to be included in url
curl -X PUT http://admin:mypassword@localhost:5984/images

Bring in CSV file into COUCHDB. Use delimiter of comma to separate my entries. Partition set by default in COUCHDB for id generation
cat [route to data.csv]| couchimport --url http://admin:mypasslocalhost:5984 --db images --delimiter ‘,’
*/