const express = require("express");
const {
  createTicket,
  getTickets,
  getTicketById,
  replyToTicket,
} = require("../controllers/ticketController");
const { protect, admin, seller } = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .post(protect, seller, createTicket)
  .get(protect, admin, getTickets);
router.route("/:id").get(protect, admin, getTicketById);
router.route("/:id/reply").put(protect, admin, replyToTicket);

module.exports = router;
