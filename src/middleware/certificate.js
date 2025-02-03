const Certificate = require('../model/certificate_model');


const CertificateController = {
    getAllCertificates: async (req, res) => {
        const certificates = await Certificate.find().sort({ createdAt: -1 });;
        if (!certificates) {
            return res.status(404).json({sucess:false,  data: 'No certificates found'});
        }
        res.json({sucess:true, data: certificates});
    },

    getCertificateById: async (req, res) =>  {
        const { id } = req.params;
        const certificate = await Certificate.findById(id);
        if (!certificate) {
            return res.status(404).json({sucess:false,  data: 'Certificate not found'});
        }
        res.json({sucess:true, data: certificate});
    },

    createCertificate: async (req, res) => {
        const { body } = req;
        const newCertificate = new Certificate(body);
        const savedCertificate = await newCertificate.save();
        res.json({sucess:true, data: savedCertificate});
    },

    updateCertificate: async (req, res) => {
        const { id } = req.params;
        const { body } = req;
        const updatedCertificate = await Certificate.findByIdAndUpdate(id, body, { new: true });
        if (!updatedCertificate) {
            return res.status(404).json({sucess:false,  data: 'Failed to update certificate'});
        }
        res.json({sucess:true, data: updatedCertificate});
    
    },

    deleteCertificate: (req, res) => {
        const { id } = req.params;
        const certificate = Certificate.findByIdAndDelete(id);
        if (!certificate) {
            return res.status(404).json({sucess:false,  data: 'Failed to delete certificate'});
        }
        res.send(`Delete certificate with ID: ${id}`);
    }
};

module.exports = CertificateController;