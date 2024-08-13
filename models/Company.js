const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a company name"],
  },
  address: {
    type: String,
    required: [true, "Please add a company address"],
  },
  phone: {
    type: String,
    required: [true, "Please add a company phone number"],
  },
  email: {
    type: String,
    required: [true, "Please add a company email"],
    unique: true,
  },
  taxId: {
    type: String,
    required: [true, "Please add a company tax ID"],
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
