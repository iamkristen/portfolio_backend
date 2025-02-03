const Certificate = require('../model/certificate_model');


const CertificateController = {
    getAllCertificates: async (req, res) => {
        const certificates = await Certificate.find().sort({ createdAt: -1 });;
        if (!certificates) {
            return res.status(404).json({success:false,  data: 'No certificates found'});
        }
        res.json({success:true, data: certificates});
    },

    getCertificateById: async (req, res) =>  {
        const { id } = req.params;
        const certificate = await Certificate.findById(id).sort({ createdAt: -1 });
        if (!certificate) {
            return res.status(404).json({success:false,  data: 'Certificate not found'});
        }
        res.json({success:true, data: certificate});
    },

    createCertificate: async (req, res) => {
        const { body } = req;
        const newCertificate = new Certificate(body);
        const savedCertificate = await newCertificate.save();
        res.json({success:true, data: savedCertificate});
    },

    updateCertificate: async (req, res) => {
        const { id } = req.params;
        const { body } = req;
        const updatedCertificate = await Certificate.findByIdAndUpdate(id, body, { new: true });
        if (!updatedCertificate) {
            return res.status(404).json({success:false,  data: 'Failed to update certificate'});
        }
        res.json({success:true, data: updatedCertificate});
    
    },

    deleteCertificate:async (req, res) => {
        const { id } = req.params; 
        // console.log(id);
        const certificate = await Certificate.findByIdAndDelete(id);
        if (!certificate) {
            return res.status(404).json({success:false,  data: 'Failed to delete certificate'});
        }
        res.json({ success: true, data: "Certificate deleted successfully." });
    }
};

module.exports = CertificateController;