const fetch = require(`node-fetch`);
const { Parser } = require('json2csv');
const data  = require('./data');
const fs = require('fs');

const getData = () => {


    return data;
    /*
    fetch('', {
        headers: {host: "marketcheck-prod.apigee.net"},
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch( err => console.error(err));
    */

}

const result = getData();
const json2csvParser = new Parser();
const csv = json2csvParser.parse(data.listings);
console.log(csv)

fs.writeFile('mycsv.csv', csv, `utf8`, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log(`saved`)//Everything went OK!
    }
});