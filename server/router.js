const express = require("express")
const router = express.Router()
const {getMoments,postMoments}  = require("./controller")


router.get("/getMoments", getMoments)
router.post("/postMoments", postMoments)


module.exports =router