const { Router } = require('express');
const AppController = require('../controllers/AppController');
const AuthenticationController = require('../controllers/AuthenticationController');
const router = Router();

router.get("/", AppController.MyInfoCard);
router.post('/register', AuthenticationController.register);
router.get('/verify/:token', AuthenticationController.verify);
// router.get('/redirect', AuthenticationController.redirectToPortfolioOrSetup);
// router.get('/generate-qr', AuthenticationController.getQRCode);
router.post('/login', AuthenticationController.login);

router.post('/scanForm/:userId', AuthenticationController.scanFormClient);
router.put('/scanForm/:id', AuthenticationController.updateForm)
router.get('/scanForm/:id', AuthenticationController.getScanForm);


module.exports = router;