const userController = require('../controller/users.controller');
const dataController = require('../controller/datacontroller');
const {authenticateToken} = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/user-profile", userController.userProfile);
router.post("/dataencrypt",dataController.dataencrypt);
router.get("/historydata", authenticateToken, userController.historydata);
//router.get("/", userController.methodGet)

module.exports = router;
