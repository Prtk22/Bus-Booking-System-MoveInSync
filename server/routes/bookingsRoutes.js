const express = require("express");
const router = express();
const {isLoggedIn} = require("../middlewares/authMiddleware");

const {
  BookSeat,
  GetAllBookings,
  GetAllBookingsByUser,
  CancelBooking,
} = require("../controllers/bookingController");

router.post("/book-seat/:userId", isLoggedIn, BookSeat);
router.get("/get-all-bookings", isLoggedIn, GetAllBookings);
router.get("/:user_Id", isLoggedIn, GetAllBookingsByUser);
router.delete("/:booking_id/:user_id/:bus_id", isLoggedIn, CancelBooking);

module.exports = router;
