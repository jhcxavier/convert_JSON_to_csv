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

const mapping = [{
    "ID":"id",
    "Categories":"inventory_type",
    "SubCategories":"build.model",
    "Title":"heading",
    "MarketValuePrice":"msrp",
    "MSRPPrice":"ref_price",
    "InternetPrice":"price",
    "SKUStock":"stock_no",
    "Vin":"vin",
    "ImageURL":"media.photo_links.0",
    "ProductPageURL":"vdp_url",
    "Year":"build.year",
    "Make":"build.make",
    "Model":"build.model",
    "Trim":"build.trim",
    "BodyType":"build.body_type",
    "DriveTrain":"build.drivetrain",
    "EngineSize":"build.engine_size",
    "Transmission":"build.transmission",
    "InteriorColor":"interior_color",
    "ExteriorColor":"exterior_color",
    "MPG":"build.city_miles",
    "Mileage":"miles"
 }];

const result = getData();
const totals = result.num_found;
const cars   = result.listings;


const feed = cars.map( (car)=> {
    return {
        
    }

})




const json2csvParser = new Parser();
const csv = json2csvParser.parse(feed);
console.log(csv)

fs.writeFile('mycsv.csv', csv, `utf8`, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log(`saved`)//Everything went OK!
    }
});


/*


        $this->mapping = array(
            "ID"                    => "id",
            "Categories"            => "inventory_type",
            "SubCategories"         => "build.make",
            "Title"                 => "heading",
            "MarketValuePrice"      => "msrp",
            "MSRPPrice"             => "ref_price",
            "InternetPrice"         => "price",
            "SKUStock"              => "stock_no",
            "Vin"                   => "vin",
            "ImageURL"              => "media.photo_links.0",
            "ProductPageURL"        => "vdp_url",
            "Year"                  => "build.year",
            "Make"                  => "build.make",
            "Model"                 => "build.model",
            "Trim"                  => "build.trim",
            "BodyType"              => "build.body_type",
            "DriveTrain"            => "build.drivetrain",
            "EngineSize"            => "build.engine_size",
            "Transmission"          => "build.transmission",
            "InteriorColor"         => "interior_color",
            "ExteriorColor"         => "exterior_color",
            "MPG"                   => "build.city_miles",
            "Mileage"               => "miles"
        );

*/