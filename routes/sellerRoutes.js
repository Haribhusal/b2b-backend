const express = require("express");
const {
  registerSeller,
  authSeller,
  verifySeller,
} = require("../controllers/sellerController");
const router = express.Router();

router.post("/register", registerSeller);
router.get("/verify/:token", verifySeller);
router.post("/login", authSeller);

// Add other seller-related routes here

module.exports = router;
