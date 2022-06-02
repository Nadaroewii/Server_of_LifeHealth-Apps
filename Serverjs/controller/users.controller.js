const bcryptjs = require('bcryptjs');
const userService = require('../services/users.services');
const usersmodel = require('../models/usersmodel');
const Hasil = require('../models/hasilmodel');

exports.register = (req, res, next) => {
    //console.log(req.body);
    const {password} = req.body;
    const salt = bcryptjs.genSaltSync(10);

    req.body.password = bcryptjs.hashSync(password, salt);

    userService.register(req.body, (error, result) => {
        if(error) {
            return next(error);
        }
        return res.status(200).send({
            message: 'Success',
            data: result,
        });
    });
};

exports.login = (req, res, next) => {
    const { username, password } = req.body;
    console.log(req.headers);

    userService.login({ username, password }, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result,
        });
    });
};

exports.userProfile = (req, res, next) => {
    return res.status(200).json({ message: "Authorized User! "});
};

 exports.historydata = (req, res, next) => {
    User.findById(
        req.body.userId,
        function (error, hasil) {
            if (error) {
                console.log(error);
            } else {
                Hasil.find().where('_id').in(hasil.userId).exec(function (err, records) {
                    console.log(err);
                    console.log(records);
                    return res.status(200).send({
                        message: 'Success',
                        data: records,
                    });
                });
            }
        }
    );
};
//     var model = {
//         userId: req.params.id,
//       // username: req.body.username,
//        //dataId: req.body.dataId
//      };

//     userService.HistoryData(model, (error, results) => {
//        if(error) {
//            return next(error);
//         }
//         else {
//            return res.status(200).send({
//                message: "Success",
//                data: results
//             });
//         }
//     });     
//  };
//exports.methodGet = async(req, res) =>{
    //try {
        //const getData = userss.findAll({})
      //  res.json(getData)
    //} catch (error) {
    //    console.error(error.message);
  //      res.status(500).send('masih error')
        
  //  }
//}