"use strict";

const express = require("express");
const SSH2Shell = require('ssh2shell')
const directoryHandler = require('../../helpers/directoryOutputHandler.helper')
const subDirectoryHandler = require('../../helpers/subDirectortOutputHandler.helper')

let router = express.Router();

router.route('/get').post(async (request, response) =>
{
    try
    {
        let commands = ["dir"]
        let directoriesConcat = ''
        let directories = null

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

        let SSH = new SSH2Shell(host)

        let callback = async (sessionText) =>
        {
            directories = sessionText
            if (directories == null)
                return response.status(500).send("Error finding directories")
        }

        await SSH.connect(callback)

        setTimeout(async () =>
        {
            if (directories == null)
            {
                console.log("No directories found...");
                console.log(directories);
                response.status(500).send("Error finding directories")

            } else
            {
                console.log("Retriving directories...");
                console.log(directories);
                directories = directoryHandler.handler(directories)

                directories.forEach(dir =>
                {
                    if (dir != "" || dir != '')
                        directoriesConcat += dir + ','
                })
                console.log(directoriesConcat);
                response.status(200).send(directoriesConcat)
            }
        }, 4000)

    }
    catch (e)
    {
        response.status(500).send(e)
    }
})

router.route('/get/subdirs').post(async (request, response) =>
{
    try
    {
        let commands = [`cd ${request.body.directoryName.replace("\r", "").replace("\n", "").replace("\t", "")}`,'dir']
        let directoriesConcat = ''
        let directories = null

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

        let SSH = new SSH2Shell(host)

        let callback = async (sessionText) =>
        {
            directories = sessionText
            if (directories == null)
                return response.status(500).send("Error finding directories")
        }

        await SSH.connect(callback)

        setTimeout(async () =>
        {
            if (directories == null)
            {
                console.log("No directories found...");
                console.log(directories);
                response.status(500).send("Error finding directories")

            } else
            {
                console.log("Retriving directories...");
                console.log("---------------------------");
                console.log(directories);
                console.log("---------------------------");
                directories = subDirectoryHandler.handler(directories)

                console.log(directories);
                directories.forEach(dir =>
                {
                    if (dir != "" || dir != '')
                        directoriesConcat += dir + ','
                })
                console.log(directoriesConcat);
                response.status(200).send(directoriesConcat)
            }
        }, 4000)

    }
    catch (e)
    {
        response.status(500).send(e)
    }
})

router.route('/delete').post(async (request, response) =>
{
    try
    {
        let commands = [`rm -rf ${request.body.directoryName}`]
        let outputMessage = null
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

        let SSH = new SSH2Shell(host)

        let callback = async (sessionText) =>
        {
            outputMessage = sessionText
            console.log(outputMessage);
            if (outputMessage == null)
                return response.status(500).send("Error deleting directory")
        }

        await SSH.connect(callback)

        setTimeout(async () =>
        {
            if (outputMessage == null)
            {
                console.log("No directories deleted...");
                console.log(directories);
                response.status(500).send("Error deleting directory")

            } else
            {
                console.log("Deleting directories...");

                response.status(200).send("Directory deleted")
            }
        }, 4000)

    }
    catch (e)
    {
        console.log(e);
        response.status(500).send(e)
    }
})

router.route('/update').post(async (request, response) =>
{
    try
    {
        let commands = [`mv ${request.body.oldDirectoryName} ${request.body.newDirectoryName}`]
        let output = null


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



        let SSH = new SSH2Shell(host)

        let callback = async (sessionText) =>
        {

            output = sessionText
            console.log(sessionText);
            if (output == null)
                return response.status(500).send("Error updating directory")
        }

        await SSH.connect(callback)

        setTimeout(async () =>
        {
            if (output == null)
            {
                console.log("nothing updated.");
                console.log(output);
                response.status(500).send("Error updating directory")
            }
            else
            {
                if (output != null)
                {
                    console.log("Inserting...");
                    response.status(200).send("Directory updated")
                }
                else
                {
                    console.log("Retriving error");
                    response.status(500).send("Error updating directory")
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

router.route('/insert').post(async (request, response) =>
{
    try
    {
        let commands = [`mkdir ${request.body.directoryName}`]
        let output = null


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



        let SSH = new SSH2Shell(host)

        let callback = async (sessionText) =>
        {

            output = sessionText
            console.log(sessionText);
            if (output == null)
                return response.status(500).send("Error inserting directory")
        }

        await SSH.connect(callback)

        setTimeout(async () =>
        {
            if (output == null)
            {
                console.log("nothing inserted.");
                console.log(output);
                response.status(500).send("Error directory host")
            }
            else
            {
                if (output != null)
                {
                    console.log("Inserting...");
                    response.status(200).send("Directory inserted")
                }
                else
                {
                    console.log("Retriving error");
                    response.status(500).send("Error inserting directory")
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

router.route('/update/subdir').post(async (request, response) =>
{
    try
    {
        console.log(request.body.directories);
        // let commands = [`mv ${request.body.oldDirectoryName} ${request.body.newDirectoryName}`]
        // let output = null


        // var host =
        // {
        //     server:
        //     {
        //         host: request.body.ip,
        //         userName: request.body.login,
        //         password: request.body.password,
        //     },
        //     commands: commands
        // }

        // console.log(host);

        // let SSH = new SSH2Shell(host)

        // let callback = async (sessionText) =>
        // {

        //     output = sessionText
        //     console.log(sessionText);
        //     if (output == null)
        //         return response.status(500).send("Error updating directory")
        // }

        // await SSH.connect(callback)

        // setTimeout(async () =>
        // {
        //     if (output == null)
        //     {
        //         console.log("nothing updated.");
        //         console.log(output);
        //         response.status(500).send("Error updating directory")
        //     }
        //     else
        //     {
        //         if (output != null)
        //         {
        //             console.log("Inserting...");
        //             response.status(200).send("Directory updated")
        //         }
        //         else
        //         {
        //             console.log("Retriving error");
        //             response.status(500).send("Error updating directory")
        //         }
        //     }
        // }, 3000)

    }
    catch (e)
    {
        console.log("bellow");
        console.log(e);
        response.status(500).send("Error inserting host")
    }
})

module.exports = router;
