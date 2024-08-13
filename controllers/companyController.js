const Company = require("../models/Company");
const asyncHandler = require("express-async-handler");

// @desc    Create a new company
// @route   POST /api/companies
// @access  Private/Admin
const createCompany = asyncHandler(async (req, res) => {
  const { name, address, phone, email, taxId } = req.body;

  const company = new Company({
    name,
    address,
    phone,
    email,
    taxId,
  });

  const createdCompany = await company.save();
  res.status(201).json(createdCompany);
});

// @desc    Get all companies
// @route   GET /api/companies
// @access  Private/Admin
const getCompanies = asyncHandler(async (req, res) => {
  const companies = await Company.find({});
  res.json(companies);
});

// @desc    Get single company by ID
// @route   GET /api/companies/:id
// @access  Private/Admin
const getCompanyById = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (company) {
    res.json(company);
  } else {
    res.status(404);
    throw new Error("Company not found");
  }
});

// @desc    Update a company
// @route   PUT /api/companies/:id
// @access  Private/Admin
const updateCompany = asyncHandler(async (req, res) => {
  const { name, address, phone, email, taxId } = req.body;

  const company = await Company.findById(req.params.id);

  if (company) {
    company.name = name || company.name;
    company.address = address || company.address;
    company.phone = phone || company.phone;
    company.email = email || company.email;
    company.taxId = taxId || company.taxId;

    const updatedCompany = await company.save();
    res.json(updatedCompany);
  } else {
    res.status(404);
    throw new Error("Company not found");
  }
});

// @desc    Delete a company
// @route   DELETE /api/companies/:id
// @access  Private/Admin
const deleteCompany = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (company) {
    await company.deleteOne(); // This replaces company.remove()
    res.json({ message: "Company removed" });
  } else {
    res.status(404);
    throw new Error("Company not found");
  }
});
module.exports = {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
