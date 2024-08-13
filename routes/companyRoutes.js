// routes/companyRoutes.js
const express = require("express");
const {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} = require("../controllers/companyController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .post(protect, admin, createCompany)
  .get(protect, admin, getCompanies);
router
  .route("/:id")
  .get(protect, admin, getCompanyById)
  .put(protect, admin, updateCompany)
  .delete(protect, admin, deleteCompany);

module.exports = router;
