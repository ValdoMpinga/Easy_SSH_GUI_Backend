"use strict";

const hostController = require('../../controllers/Database/host.contoller')
const express = require("express");


let router = express.Router();

router.route('/get').get(async (request, response) =>
{
    try
    {
        const hosts = await hostController.getHosts()
        response.status(200).send(hosts)
    }
    catch (e)
    {
        response.status(500).send(e)
    }
})

router.route('/insert').post(async (request, response) =>
{
    try
    {
        let hostObject = {
            ip: request.body.ip,
            login: request.body.login,
            password: request.body.password,
            connectionName: request.body.connectionName,
        }

        let result = await hostController.insertHost(hostObject)

        if (result != null)
            response.status(200).send("Host inserted")
        else
            response.status(500).send("Error inserting host")

    }
    catch (e)
    {
        console.log(e);
        response.status(500).send(e)
    }
})

router.route('/delete').post(async (request, response) =>
{
    try
    {
        let result = await hostController.deleteHost(request.body.id)
        if (result == 1)
            response.status(200).send("Host deleted")
        else
            response.status(500).send("Some error occured")
    }
    catch (e)
    {
        console.log(e);
        response.status(500).send(e)
    }
})

// router.route('/insert').post(async (request, response) =>
// {
//     try
//     {

//     }
//     catch (e)
//     {
//         response.status(500).send(e)
//     }
// })

module.exports = router;
