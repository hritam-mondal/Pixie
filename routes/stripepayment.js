var express = require('express');
const app = require('../app');
const router = express.Router();
const {makepayment} = require("../controllers/stripepayment");

router.post("/stripepayment", makepayment)

module.exports = router;