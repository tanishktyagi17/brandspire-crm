const Company = require("../models/Company");

/* ===========================================================
   GET COMPANY SETTINGS
=========================================================== */

exports.getCompany = async (req, res) => {
  try {
    let company = await Company.findOne();

    if (!company) {
      company = await Company.create({});
    }

    res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    console.error("Get Company Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch company settings.",
    });
  }
};

/* ===========================================================
   UPDATE COMPANY SETTINGS
=========================================================== */

exports.updateCompany = async (req, res) => {
  try {
    let company = await Company.findOne();

    if (!company) {
      company = await Company.create(req.body);
    } else {
      Object.assign(company, req.body);
      await company.save();
    }

    res.status(200).json({
      success: true,
      message: "Company settings updated successfully.",
      company,
    });
  } catch (error) {
    console.error("Update Company Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update company settings.",
    });
  }
};