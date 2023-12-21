const express = require("express")
const router = express.Router()
const {getMoments,postMoments,updateMoments}  = require("./controller")


router.get("/getMoments", getMoments)
router.post("/postMoments", postMoments)
router.put("/updateMoments", updateMoments)


module.exports =router