const fetch = require(`node-fetch`);
var flatten = require('flat')
const { Parser } = require('json2csv');
const fs = require('fs');
const { Client } = require('pg')
const client = new Client({
    user: 'user',
    host: 'host',
    database: 'automotive_feeds',
    password: 'password',
    port: 5432,
})


const dealerId = 1011613;

const mapping = {
    "ID": "id",
    "Categories": "inventory_type",
    "SubCategories": "build.model",
    "Title": "heading",
    "MarketValuePrice": "msrp",
    "MSRPPrice": "ref_price",
    "InternetPrice": "price",
    "SKUStock": "stock_no",
    "Vin": "vin",
    "ImageURL": "media.photo_links.0",
    "ProductPageURL": "vdp_url",
    "Year": "build.year",
    "Make": "build.make",
    "Model": "build.model",
    "Trim": "build.trim",
    "BodyType": "build.body_type",
    "DriveTrain": "build.drivetrain",
    "EngineSize": "build.engine_size",
    "Transmission": "build.transmission",
    "InteriorColor": "interior_color",
    "ExteriorColor": "exterior_color",
    "MPG": "build.city_miles",
    "Mileage": "miles"
};
const mapkeys = Object.keys(mapping);


const getMapping = async (dealerId) => {
    await client.connect()

    // client.query('SELECT mapping FROM feeds WHERE dealer_id = $1', [dealerId], (err, res) => {
    //     //console.log(err, res)
    //     if (!err)
    //         return res.rows[0];
    //     client.end()

    //     throw new Error(err);
    // })
    client.query('SELECT mapping FROM feeds WHERE dealer_id = $1', [dealerId])
        .then(result =>
            console.log(result)
        )
        .catch(e =>
            console.error(e.stack)
        )
        .then(() => client.end())


}

const getData = async (dealerId) => {

    try {
        const response = await fetch(`url`, {
            headers: { host: "host" },
        })
        const json = await response.json();
        return Promise.resolve(json);
        //console.log("JSON ", json)

    }
    catch (e) {
        throw new Error(e.message);
        console.log("error ", e)
    }
}


getMapping(dealerId).then((result) => {
    console.log("RRRRR ", result)
});

/*
getData(1004115).then((result) => {
    console.log("DATA ", result);

    const totals = result.num_found;
    const cars = result.listings;
    const feed = cars.map((car) => {
        const flatCar = flatten(car);
        let autoInfo = {};
        mapkeys.forEach((key) => {
            autoInfo[key] = flatCar[mapping[key]];
        })
        return autoInfo;
    })

    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(feed);

    fs.writeFile('mycsv.csv', csv, `utf8`, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log(`saved`)//Everything went OK!
        }
    });


});
*/







