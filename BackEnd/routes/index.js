const { Router } = require('express');
const AppController = require('../controllers/AppController');
const AuthenticationController = require('../controllers/AuthenticationController');
const router = Router();

router.get("/", AppController.MyInfoCard);
router.post('/register', AuthenticationController.register);
router.get('/verify/:token', AuthenticationController.verify);

router.post('/scanForm/:id', AuthenticationController.scanFormClient);
router.put('/scanForm/:id', AuthenticationController.updateForm)
router.get('/scanForm/:id', AuthenticationController.getScanForm);


module.exports = router;