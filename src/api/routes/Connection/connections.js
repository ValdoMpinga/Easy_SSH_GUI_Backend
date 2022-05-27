"use strict";

const hostController = require('../../controllers/Database/host.contoller')
const express = require("express");
const fs = require('fs');
const { log } = require('console');

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
        let commands = []
        commands.push("dir")
        let output = null
        let hostObject = {
            ip: request.body.ip,
            login: request.body.login,
            password: request.body.password,
            connectionName: request.body.connectionName,
        }

        var host =
        {
            server:
            {
                host: request.body.ip,
                userName: request.body.login,
                password: request.body.password,
            },
            commands: commands
        }

        console.log(host);


        var SSH2Shell = require('ssh2shell'),
            SSH = new SSH2Shell(host)

        let callback = async (sessionText) =>
        {
            fs.writeFile('./file.txt', sessionText, (err) =>
            {
                output = sessionText
                console.log("Session text: " + sessionText);
                if (output == null)
                    return response.status(500).send("Error inserting host")
            });
        }

        await SSH.connect(callback)

        setTimeout(async () =>
        {
            if (output == null)
            {
                console.log("nothing inserted.");
                console.log(output);
                response.status(500).send("Error inserting host")
            }
            else
            {
                console.log("Inserting...");

                let result = await hostController.insertHost(hostObject)

                if (result == 1)
                {
                    console.log("Retriving success");
                    response.status(200).send("Host inserted")

                }
                else
                {
                    console.log("Retriving error");
                    response.status(500).send("Error inserting host")
                }
            }
        }, 3000)

    }
    catch (e)
    {
        console.log("bellow");
        console.log(e);
        response.status(500).send("Error inserting host")
    }
})

router.route('/update').post(async (request, response) =>
{

    try
    {
        let commands = []
        commands.push("dir")
        let output = null
        let hostObject = {
            _id: request.body._id,
            ip: request.body.ip,
            login: request.body.login,
            password: request.body.password,
            connectionName: request.body.connectionName,
        }

        var host =
        {
            server:
            {
                host: request.body.ip,
                userName: request.body.login,
                password: request.body.password,
            },
            commands: commands
        }

        console.log(host);


        var SSH2Shell = require('ssh2shell'),
            SSH = new SSH2Shell(host)

        let callback = async (sessionText) =>
        {
            fs.writeFile('./file.txt', sessionText, (err) =>
            {
                output = sessionText
                console.log("Session text: " + sessionText);
                if (output == null)
                    return response.status(500).send("Error updating host")
            });
        }

        await SSH.connect(callback)

        setTimeout(async () =>
        {
            if (output == null)
            {
                console.log("nothing updated.");
                console.log(output);
                response.status(500).send("Error updating host")
            }
            else
            {
                console.log("Inserting...");

                let result = await hostController.updateHost(hostObject)

                if (result == 1)
                {
                    console.log("Retriving success");
                    response.status(200).send("Host updated")

                }
                else
                {
                    console.log("Retriving error");
                    response.status(500).send("Error updating host")
                }
            }
        }, 3000)

    }
    catch (e)
    {
        console.log("bellow");
        console.log(e);
        response.status(500).send("Error updating host")
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

module.exports = router;
