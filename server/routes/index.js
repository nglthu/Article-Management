var express = require("express")
var router = express.Router();

import {getIndex} from "../handlers/indexHandler"

// fires before entring the router continuation block
router.use(
    function(req,res,next){
        next();
    }
)

router.get("/", getIndex)

module.exports = router


