const Booking = require("../models/bookingsModel");
const Bus = require("../models/busModel");
const User = require("../models/usersModel");

const BookSeat = async (req, res) => {
  const newBooking = new Booking({
    ...req.body,
    user: req.params.userId,
  });
  newBooking.save()
  .then(() => {
    return User.findById(req.params.userId).exec()
  })
  .then(() => {
    return Bus.findById(req.body.bus);
  })
  .then((bus) => {
    bus.seatsBooked = [...bus.seatsBooked, ...req.body.seats];
    return bus.save();
  })
  .then(() => {
    res.status(200).send({
      message: "Seat booked successfully",
      data: newBooking,
      user: user._id,
      success: true,
    });
  })
  .catch ((error) =>  {
    console.log(error);
    res.status(500).send({
      message: "Booking failed",
      data: error,
      success: false,
    });
  })
};

const GetAllBookings = async (req, res) => {
  Booking.find().populate("bus").populate("user").exec()
  .then((bookings) => {
    res.status(200).send({
      message: "All bookings",
      data: bookings,
      success: true,
    });
  })
  .catch((error) => {
    res.status(500).send({
      message: "Failed to get bookings",
      data: error,
      success: false,
    });
  });
};

const GetAllBookingsByUser = (req, res) => {
  Booking.find({ user: req.params.user_Id }).populate([
    "bus",
    "user",
  ]).exec()
  .then((bookings) => {
    res.status(200).send({
      message: "Bookings fetched successfully",
      data: bookings,
      success: true,
    });
  })
  .catch ((error) => {
    res.status(500).send({
      message: "Bookings fetch failed",
      data: error,
      success: false,
    });
  });
};

// cancel booking by id and remove the seats from the bus seatsBooked array
const CancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.booking_id);
    const user = await User.findById(req.params.user_id);
    const bus = await Bus.findById(req.params.bus_id);
    if (!booking || !user || !bus) {
      res.status(404).send({
        message: "Booking not found",
        data: error,
        success: false,
      });
    }

    booking.remove();
    bus.seatsBooked = bus.seatsBooked.filter(
      (seat) => !booking.seats.includes(seat)
    );
    await bus.save();
    res.status(200).send({
      message: "Booking cancelled successfully",
      data: booking,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "Booking cancellation failed",
      data: error,
      success: false,
    });
  }
};
module.exports = {
  BookSeat,
  GetAllBookings,
  GetAllBookingsByUser,
  CancelBooking
};
