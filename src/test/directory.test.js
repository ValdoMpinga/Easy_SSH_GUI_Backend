const SSH2Shell = require('ssh2shell')
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



    it('directory list',async  function ()
    {
        try
        {
            connectionData = {
                host: "192.168.1.7",
                userName: "osboxes",
                password: "osboxes.org",
            }

            let commands = []
            commands.push("dir")

            host = commandsInitializer(connectionData, commands)

      
            SSH = new SSH2Shell(host),
                callback =  function (sessionText)
                {
                    console.log(sessionText)
                    return sessionText
                }

            function callConnection()
            {
                SSH.connect(callback);
            }
           
            
            function promisify(func)
            {
                return function ()
                {
                    return new Promise((resolve, reject) =>
                    {
                        try
                        {
                            func(resolve)
                        } catch (e)
                        {
                            reject(e)
                        }
                    })
                    }
            }
            
            const promesified = promisify(callConnection())
            promesified().then(res => console.log(res))
            let a = await promesified()
            console.log(a);
            console.log("Ola");

    
        } catch (e)
        {
            console.log("Error bellow");
            console.log(e);
        }
        connectionData = {
            host: "192.168.1.254",
            userName: "osboxes",
            password: "osboxes.org",
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
        commands: commandsList
    };
    return host
}
