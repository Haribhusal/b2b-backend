const Ticket = require("../models/Ticket");
const asyncHandler = require("express-async-handler");

// @desc    Create a new ticket
// @route   POST /api/tickets
// @access  Private/Seller
const createTicket = asyncHandler(async (req, res) => {
  const { subject, description } = req.body;

  const ticket = new Ticket({
    seller: req.user._id, // The seller's ID will be automatically set from the authenticated user
    subject,
    description,
  });

  const createdTicket = await ticket.save();
  res.status(201).json(createdTicket);
});

// @desc    Get all tickets (Admin only)
// @route   GET /api/tickets
// @access  Private/Admin
const getTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({}).populate("seller", "name email");
  res.json(tickets);
});

// @desc    Get a single ticket by ID
// @route   GET /api/tickets/:id
// @access  Private/Admin
const getTicketById = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id).populate(
    "seller",
    "name email"
  );

  if (ticket) {
    res.json(ticket);
  } else {
    res.status(404);
    throw new Error("Ticket not found");
  }
});

// @desc    Reply to a ticket (Admin only)
// @route   PUT /api/tickets/:id/reply
// @access  Private/Admin
const replyToTicket = asyncHandler(async (req, res) => {
  const { reply } = req.body;

  const ticket = await Ticket.findById(req.params.id);

  if (ticket) {
    ticket.adminReply = reply;
    ticket.status = "In Progress";
    ticket.updatedAt = Date.now();

    const updatedTicket = await ticket.save();
    res.json(updatedTicket);
  } else {
    res.status(404);
    throw new Error("Ticket not found");
  }
});

module.exports = {
  createTicket,
  getTickets,
  getTicketById,
  replyToTicket,
};
