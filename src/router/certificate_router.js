const express = require('express');
const certificateController = require('../middleware/certificate');
const { verify } = require("../middleware/authentication");


const router = express.Router();

router.post('/add',verify, certificateController.createCertificate);

router.post('/update/:id',verify, certificateController.updateCertificate);

router.delete('/delete/:id', verify, certificateController.deleteCertificate);

router.get('/get', certificateController.getAllCertificates);

router.get('/get/:id', certificateController.getCertificateById);

module.exports = router;