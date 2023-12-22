const express = require("express")
const router = express.Router()
const {getMoments,postMoments,updateMoments,deleteMoments}  = require("./controller")


router.get("/getMoments", getMoments)
router.post("/postMoments", postMoments)
router.put("/updateMoments", updateMoments)
router.put("/deleteMoments",deleteMoments)


module.exports =router