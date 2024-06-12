const aboutMeModel = require("../model/about_me_model");

async function addAboutMe(req, res) {
  try {
    const data = req.body;
    const aboutMe = new aboutMeModel(data);
    const savedData = await aboutMe.save();
    // console.log(savedData)
    if (!savedData) {
      return res.json({ success: false, error: "Failed to save data." });
    }

    res.json({ success: true, data: savedData });
  } catch (error) {
    console.error("AddAboutMe Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

async function updateAboutMe(req, res) {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedData = await aboutMeModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedData) {
      return res.json({ success: false, error: "Failed to update data." });
    }

    res.json({ success: true, data: updatedData });
  } catch (error) {
    console.error("UpdateAboutMe Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

async function deleteAboutMe(req, res) {
  try {
    const id = req.params.id;
    const deleteData = await aboutMeModel.findByIdAndDelete(id);

    if (!deleteData) {
      return res.json({ success: false, error: "Failed to delete data." });
    }

    res.json({ success: true, data: "Page deleted successfully." });
  } catch (error) {
    console.error("DeleteAboutMe Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

async function getAboutMe(req, res) {
  try {
    const result = await aboutMeModel.findOne();

    if (!result) {
      return res.json({ success: false, error: "No data found." });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    console.error("GetAboutMe Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
module.exports = {
  addAboutMe,
  updateAboutMe,
  deleteAboutMe,
  getAboutMe,
};
