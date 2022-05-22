const SSH2Shell = require('ssh2shell')
const deasync = require('deasync');


async function commandExecuter(connectionData, commandsList)
{
    let hostData = commandsInitializer(connectionData, commandsList)

    console.log(commandsList);
    SSH = new SSH2Shell(hostData),
        callback = async function (sessionText)
        {
            while ((sessionText == undefined))
            {
                deasync.runLoopOnce();
            }
            console.log(sessionText);
            return sessionText
        }

    SSH.connect(callback);

}

function commandsInitializer(connectionData, commandsList)
{
    let host = {
        server: {
            host: connectionData.ip,
            userName: connectionData.login,
            password: connectionData.password,
        },
        commands: commandsList
    };
    return host
}

module.exports = { commandExecuter }
