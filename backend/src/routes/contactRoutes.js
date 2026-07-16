const express = require("express");
const router = express.Router();
const c = require("../controllers/contactController");

router.post("/", c.submitContactForm);

module.exports = router;
