const express = require("express")
const router = express.Router()
const {getMoments,postMoments,updateMoments,deleteMoments,gettodolist,updatetodolist,deleteToDo}  = require("./controller")


router.get("/getMoments", getMoments)
router.post("/postMoments", postMoments)
router.put("/updateMoments", updateMoments)
router.put("/deleteMoments", deleteMoments)
router.get("/getTodolist", gettodolist)
router.put("/updateToDoListStatus", updatetodolist)
router.put("/deleteToDo",deleteToDo)


module.exports =router