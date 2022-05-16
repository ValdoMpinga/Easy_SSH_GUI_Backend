"use strict";

const express = require("express");

let router = express.Router();

router.route('/get').get( async (request, response) =>
{
    try
    {
        response.status(200).send('directory')
    }
    catch (e)
    {
        response.status(500).send(e)
    }
})

module.exports = router;
