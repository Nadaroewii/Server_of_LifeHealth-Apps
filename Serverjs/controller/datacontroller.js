const bcryptjs = require('bcryptjs');
const dataService = require('../services/data.services');
const pct = require('../../ElgamalCrypto/PecahChiperText');
const Base64 = require('js-base64');
const ed = require('../../ElgamalCrypto/EnkripDekrip');
const ky = require('../../Serverjs/config/key');
//const datamodel = require('../models/datamodel');

//const userss = usersmodel.userSchema;
const User = require('../models/usersmodel');
const { json } = require('body-parser');
exports.dataencrypt = (req, res, next) => {
    
    console.log(req.body);
    try {
        let duration = req.body.duration; duration = duration.substring(2, duration.length - 3);
        let distance = req.body.distance; distance = distance.substring(2, distance.length - 3);
        let dataactv = req.body.dataactv; dataactv = dataactv.substring(2, dataactv.length - 3);
        let kal = req.body.kal; kal = kal.substring(2, kal.length - 3);
        let lastlatitude = req.body.lastlatitude; lastlatitude = lastlatitude.substring(2, lastlatitude.length - 3);
        let lastlongitude = req.body.lastlongitude; lastlongitude = lastlongitude.substring(2, lastlongitude.length - 3);

        let datamodel = {
            'duration': duration.split('","')[0],
            'distance': distance.split('","')[0],
            'dataactv': dataactv.split('","')[0],
            'kal': kal.split('","')[0],
            'lastlatitude': lastlatitude.split('","')[0],
            'lastlongitude': lastlongitude.split('","')[0],
        };
        
        let datachiper = {
            'duration': duration.split('","')[1],
            'distance': distance.split('","')[1],
            'dataactv': dataactv.split('","')[1],
            'kal': kal.split('","')[1],
            'lastlatitude': lastlatitude.split('","')[1],
            'lastlongitude': lastlongitude.split('","')[1],
        };

        //pisah chiper text tiap data
        let chiperdur = pct.setChiper(Base64.decode(datamodel['duration'].toString()));
        let ngamadur = chiperdur[0];
        let ndeltadur = chiperdur[1];
        let chiperdis = pct.setChiper(Base64.decode(datamodel['distance'].toString()));
        let ngamadis = chiperdis[0];
        let ndeltadis = chiperdis[1];
        let chiperdat = pct.setChiper(Base64.decode(datamodel['dataactv'].toString()));
        let ngamadat = chiperdat[0];
        let ndeltadat = chiperdat[1];
        let chiperkal = pct.setChiper(Base64.decode(datamodel['kal'].toString()));
        let ngamakal = chiperkal[0];
        let ndeltakal = chiperkal[1];
        let chiperlat = pct.setChiper(Base64.decode(datamodel['lastlatitude'].toString()));
        let ngamalat = chiperlat[0];
        let ndeltalat = chiperlat[1];
        let chiperlon = pct.setChiper(Base64.decode(datamodel['lastlongitude'].toString()));
        let ngamalon = chiperlon[0];
        let ndeltalon = chiperlon[1];

        let hasilDekripdur = "";
        let hasilDekripdis = "";
        let hasilDekripdat = "";
        let hasilDekripkal = "";
        let hasilDekriplat = "";
        let hasilDekriplon = "";

        //console.log("\nduration");
        for (var i = 0; i < ndeltadur.length; i++) {
            let dekdur = ed.getDekripsi(ngamadur[i].toString(),
                ndeltadur[i].toString(), ky.PubKey[0], ky.privateKey, datachiper['duration']);
            //console.log(ngamadur[i].toString() + " = " + dekdur);
            hasilDekripdur += dekdur;
        }
            
        for (var i = 0; i < ndeltadis.length; i++) {
            let dekdis = ed.getDekripsi(ngamadis[i].toString(),
                    ndeltadis[i].toString(), ky.PubKey[0], ky.privateKey, datachiper['distance']);
                    hasilDekripdis += dekdis;
            }
        
        //console.log("\ndataatcv");
        for (var i = 0; i < ndeltadat.length; i++) {
            let dekdat = ed.getDekripsi(ngamadat[i].toString(),
                    ndeltadat[i].toString(), ky.PubKey[0], ky.privateKey, datachiper['dataactv']);
           // console.log(ndeltadat[i].toString() + " = " + dekdat);
            hasilDekripdat += dekdat;
        }
        for (var i = 0; i < ndeltakal.length; i++) {
                let dekkal = ed.getDekripsi(ngamakal[i].toString(),
                        ndeltakal[i].toString(), ky.PubKey[0], ky.privateKey, datachiper['kal']);
                    hasilDekripkal += dekkal;
              }
        for (var i = 0; i < ndeltalat.length; i++) {
                let deklat = ed.getDekripsi(ngamalat[i].toString(),
                        ndeltalat[i].toString(), ky.PubKey[0], ky.privateKey, datachiper['lastlatitude']);
                    hasilDekriplat += deklat;
              }
              for (var i = 0; i < ndeltalon.length; i++) {
                let deklon = ed.getDekripsi(ngamalon[i].toString(),
                        ndeltalon[i].toString(), ky.PubKey[0], ky.privateKey, datachiper['lastlongitude']);
                    hasilDekriplon += deklon;
              }

              let datadekrip = {
                'duration': hasilDekripdur,
                'distance': hasilDekripdis,
                'dataactv': hasilDekripdat,
                'kal': hasilDekripkal,
                'lastlatitude': hasilDekriplat,
                'lastlongitude': hasilDekriplon,
            };

           // var stringdata = JSON.stringify(datadekrip);
        //console.log("\nhasilDekrip : \n" + stringdata);
        console.log("\n Hasil Dekripsi \n");
        for (const key of Object.keys(datadekrip)) {
            console.log(key + " : " + datadekrip[key])
        }

        dataService.dataencrypt(datamodel, (error, result) => {
            //console.log("Fungsi enkripsi");
            if (error) {
                return next(error);
            }

            return res.status(200).send({
                message: "Success",
                data: result,
            });
        }),
        
        dataService.datadecrypt(datadekrip, (error, result) => {
            //console.log("Fungsi dekripsi");
            if (error) {
                return next(error);
            }
            User.findByIdAndUpdate(
                req.body.userId,
                { $push: { userId: result.id } },
                { new: true },
                function (error, user) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Berhasil");
                       // return res.status(200).send({
                         //   message: 'Success',
                        //});                   
                    }
                }
            );
        });
    } catch (error) {
        console.log(error)
    }
    
};
//         dataService.dataencrypt(datamodel, (error, result) => {
//             if (error) {
//                 return next(error);
//             }
//             User.findByIdAndUpdate(
//                 req.body.userId,
//                 { $push: { datarecord: result.id } },
//                 { new: true },
//                 function (error, user) {
//                     if (error) {
//                         console.log(error);
//                     } else {
//                         return res.status(200).send({
//                             message: 'Success',
//                         });                   
//                     }
//                 }
//             );
//         });
//     } catch (error) {
//         console.log(error)
//     }
    
// };
            //return res.status(200).send({
                //message: 'Success',
                //data: result,
            
 