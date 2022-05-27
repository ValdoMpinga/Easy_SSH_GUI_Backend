describe('ssh directory CRUD test', function ()
{
    it.skip('directory creation', function ()
    {
        connectionData = {
            host: "192.168.1.254",
            userName: "osboxes",
            password: "osboxes.org",
        }

        let commands = []
        commands.push("mkdir mydir")


        host = commandsInitializer(connectionData, commands)
        SSH = new SSH2Shell(host),
            callback = function (sessionText)
            {
                console.log(sessionText)
            }

        SSH.connect(callback);
    });



    it('directory list',  function ()
    {
        try
        {
            let commands = []
            commands.push("dir")
            commands.push("ls -la")

            var host =
            {
                server:
                {
                    host: "192.168.1.7",
                    userName: "osboxes",
                    password: "osboxes.org",
                },
                commands: commands
            }

            var SSH2Shell = require('ssh2shell'),
                SSH = new SSH2Shell(host)
            
                callback =  (sessionText) =>
                {
                    // console.log("text bellow : ");
                    console.log(sessionText); 
                    return sessionText
                }

            let output = await SSH.connect(callback)

            console.log("Butterflies");

        } catch (e)
        {
            console.log("Error bellow");
            console.log(e);
        }


    });

    it.skip('directory update', function ()
    {
        connectionData = {
            host: "192.168.1.254",
            userName: "osboxes",
            password: "osboxes.org",
        }

        let commands = []
        commands.push("mv mydir mydir_renamed")
        commands.push("dir")


        host = commandsInitializer(connectionData, commands)
        SSH = new SSH2Shell(host),
            callback = function (sessionText)
            {
                console.log(sessionText)
            }

        SSH.connect(callback);
    });

    it.skip('directory delete', function ()
    {
        connectionData = {
            host: "192.168.1.254",
            userName: "osboxes",
            password: "osboxes.org",
        }

        let commands = []
        commands.push("rm -rf mydir_renamed")
        commands.push("dir")


        host = commandsInitializer(connectionData, commands)
        SSH = new SSH2Shell(host),
            callback = function (sessionText)
            {
                console.log(sessionText)
            }

        SSH.connect(callback);
    });
});

function commandsInitializer(connectionData, commandsList)
{
    let host = {
        server: {
            host: connectionData.host,
            userName: connectionData.userName,
            password: connectionData.password,
        },
        commands: commandsList,
        onEnd: function (sessionText, sshObj)
        {
            deffered.resolve(sessionText)
        }
    };
    return host
}

async function textReturn()
{
    try
    {
        let commands = []
        commands.push("dir")
        commands.push("ls -la")

        var host =
        {
            server:
            {
                host: "192.168.1.7",
                userName: "osboxes",
                password: "osboxes.org",
            },
            commands: commands
        }

        var sessionText
        var SSH2Shell = require('ssh2shell'),
            SSH = new SSH2Shell(host),
            callback = async (st) =>
            {
                // console.log("text bellow : ");
                sessionText = await st
                console.log(st); 
                console.log(sessionText); 
                return st
            }

        SSH.connect(callback);

        console.log("-> " + sessionText);
        console.log("HELOOO");


        // let output = await SSH.connect(callback)
        // SSH.pipe(sessionText)
        // console.log(sessionText);
        // return sessionText

        // console.log("Butterflies");

    } catch (e)
    {
        console.log("Error bellow");
        console.log(e);
    }
} 
