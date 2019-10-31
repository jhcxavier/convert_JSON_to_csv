const fetch = require(`node-fetch`);
var flatten = require('flat');
const { Parser } = require('json2csv');
const fs = require('fs');
const { Client } = require('pg');
const client = new Client({
    user: 'user',
    host: 'host',
    database: 'automotive_feeds',
    password: 'password',
    port: 5432
});

const dealerId = 1011613;
here
const getMapping = async (dealerId) => {
    client.connect();

    try {
        const res = await client.query('SELECT mapping FROM feeds WHERE dealer_id = $1', [ dealerId ]);
        client.end();
        return res.rows[0]["mapping"];
    } catch (err) {
        client.end();
    }
};

const getData = async (dealerId) => {

    try {
        const response = await fetch(
            `url`,
            {
                headers: { host: 'marketcheck-prod.apigee.net' }
            }
        );
        return response.json();
    } catch (e) {
        console.log('error ', e);
        throw new Error(e.message);
    }
};


getMapping(dealerId).then((mapping) => {
    const mapkeys = Object.keys(mapping);
    
    getData(dealerId).then((result) => {
        console.log("result get data ", result)


        const totals = result.num_found;
        const cars = result.listings;
        const feed = cars.map((car) => {
            const flatCar = flatten(car);
            let autoInfo = {};
            mapkeys.forEach((key) => {
                autoInfo[key] = flatCar[mapping[key]];
            });
            return autoInfo;
        });

        const json2csvParser = new Parser();
        const csv = json2csvParser.parse(feed);

        fs.writeFile('mycsv.csv', csv, `utf8`, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log(`saved`); //Everything went OK!
            }
        });
    });
});