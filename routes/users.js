const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userController'); 

router.get('/signin', userController.signin);
router.get('/logout', passport.checkAuthentication ,userController.logout);

router.post('/create-Session',passport.authenticate(
   'local',
   {failureRedirect: '/users/signin'},
), userController.createSession);

router.post('/store_data', passport.checkAuthentication, userController.storeUniversityDetails);
router.get('/loadtable', passport.checkAuthentication, userController.loadTable);
router.get('/delete',passport.checkAuthentication, userController.delete);
router.post('/update_data', passport.checkAuthentication, userController.update);

module.exports = router;