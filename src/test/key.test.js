var SSH2Shell = require('ssh2shell')



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

