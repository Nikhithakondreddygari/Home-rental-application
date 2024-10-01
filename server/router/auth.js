const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const authController = require("../controllers/authController");
const bookingController = require("../controllers/bookingController");
const listingController = require("../controllers/listingController");

//register
router.post(
  "/register",
  upload.single("profileImage"),
  authController.registerUser
);
//login
router.post("/login", authController.loginUser);

// GET TRIP LIST
router.get("/:userId/trips", bookingController.getTripList);

// ADD LISTING TO WISHLIST
router.patch("/:userId/:listingId", bookingController.toggleWishList);

// GET PROPERTY LIST
router.get("/:userId/properties", bookingController.getPropertyList);

// GET RESERVATION LIST
router.get("/:userId/reservations", bookingController.getReservationList);

/* CREATE LISTING */
router.post(
  "/create",
  upload.array("listingPhotos"),
  listingController.createListing
);

/* GET LISTINGS BY CATEGORY */
router.get("/", listingController.getListingsByCategory);

/* GET LISTINGS BY SEARCH */
router.get("/search/:search", listingController.getListingsBySearch);

/* LISTING DETAILS */
router.get("/:listingId", listingController.getListingDetails);

module.exports = router;
