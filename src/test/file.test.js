var SSH2Shell = require('ssh2shell')



describe('ssh file CRUD test', function ()
{
    it.skip('file creation', function ()
    {
        connectionData = {
            host: "192.168.1.254",
            userName: "osboxes",
            password: "osboxes.org",
        }

        let commands = []
       // commands.push("touch hello.txt")
        commands.push("vi hello.txt")

        host = commandsInitializer(connectionData, commands)
        SSH = new SSH2Shell(host),
            callback = function (sessionText)
            {
                console.log(sessionText)
            }

        SSH.connect(callback);
    });



    it.skip('file list', function ()
    {
        connectionData = {
            host: "192.168.1.254",
            userName: "osboxes",
            password: "osboxes.org",
        }

        let commands = []
        commands.push("ls -al | grep '^-'")


        host = commandsInitializer(connectionData, commands)
        SSH = new SSH2Shell(host),
            callback = function (sessionText)
            {
                console.log("oi " + sessionText + " oi")
            }

        SSH.connect(callback);
    });

    it.skip('file update', function ()
    {
        connectionData = {
            host: "192.168.1.254",
            userName: "osboxes",
            password: "osboxes.org",
        }

        let commands = []
        commands.push("mv hello.txt hello.js")
        commands.push("ls -al | grep '^-'")


        host = commandsInitializer(connectionData, commands)
        SSH = new SSH2Shell(host),
            callback = function (sessionText)
            {
                console.log(sessionText)
            }

        SSH.connect(callback);
    });

    it('file delete', function ()
    {
        connectionData = {
            host: "192.168.1.254",
            userName: "osboxes",
            password: "osboxes.org",
        }

        let commands = []
        commands.push("rm -rf hello.js")
        commands.push("ls -al | grep '^-'")


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
        commands: commandsList
    };
    return host
}
