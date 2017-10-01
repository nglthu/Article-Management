var express = require("express")
var router = express.Router();

import {getIndex} from "../handlers/indexHandler"
require('child_process');

// fires before entring the router continuation block
router.use(
    function(req,res,next){
        next();
    }
)

router.get("/", getIndex)
router.get('/user', getIndex)
router.get('/article', getIndex)
router.get('/search', getIndex)

module.exports = router


