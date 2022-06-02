var faker = require("faker");
var haversine = require("haversine")
const fs = require('fs');

var name = faker.name.findName();
var list = ["Jalan Cepat", "Jalan Normal"]
var Weight = faker.datatype.number({min: 150, max: 175})
var akt = list[Math.floor(Math.random() * list.length)];
    
function dummy() {
    function calcCrow(lat1, lon1, lat2, lon2) {
        const start = {
            latitude: lat1,
            longitude: lon1
        }
        const end = {
            latitude: lat2,
            longitude: lon2
            }  
        return haversine(start, end, {unit: 'meter'});
    }

//for (i = 0; i < 10; i++) {
    if (akt == "Jalan Cepat") {
        //Lokasi Start
        var long11 = faker.address.longitude(112.706630, 112.706650)
        var lat11 = faker.address.latitude(-7.368210, -7.369100)
        //Lokasi Sekarang
        var long21 = faker.address.longitude(112.705970, 112.706680)
        var lat21 = faker.address.latitude(-7.368220, -7.369120)
        var dist = calcCrow(lat11,long11,lat21,long21);
        var time = faker.datatype.number({min: 0, max: 30})
        var kec = (dist/1000) / (time/60);
        if (4.8 <= kec || kec <= 5.5) {
            kal = (3.3 * 7.7 * (Weight * 2.2)/200)*time;
        } else if (5.6 <= kec || kec <= 6.4) {
            kal = (3.8 * 7.7 * (Weight * 2.2)/200)*time;
        } else if (kec == 0) {
            kal = 0;
        } else {
            kal = (5 * 7.7 * (Weight * 2.2)/200)*time;
        }
    }
    else if (akt == "Jalan Normal") {
        //Lokasi Start
        var long11 = faker.address.longitude(112.706630, 112.706650)
        var lat11 = faker.address.latitude(-7.368210, -7.369100)
        //Lokasi Sekarang
        var long21 = faker.address.longitude(112.705970, 112.706680)
        var lat21 = faker.address.latitude(-7.368220, -7.369120)
        var dist = calcCrow(lat11,long11,lat21,long21);
        var time = faker.datatype.number({min: 10, max: 30})
        var kec = (dist/1000) / (time/60);
        if (kec < 3.2) {
            kal = (2 * 7.7 * (Weight * 2.2)/200)*time;
        } else if (3.2 < kec || kec <= 4.7) {
            kal = (2.5 * 7.7 * (Weight * 2.2)/200)*time;
        } else if (kec == 0) {
            kal = 0;
        }
    }

    var hasil = [name, time, dist, akt, kal, lat21, long21];
    return hasil;
}
    //output.push(hasil)
//}
// console.log(dummy());
const datacoba = dummy();
module.exports = {
    datacoba
};
console.log(datacoba[0]);
// const jsonContent = JSON.stringify(output);

// fs.writeFile("./collect.json", jsonContent, 'utf8', function (err) {
//     if (err) {
//         return console.log(err);
//     }

//     console.log("The file was saved!");
//}); 