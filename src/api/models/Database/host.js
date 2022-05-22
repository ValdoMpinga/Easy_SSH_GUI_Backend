const hostSchema = require('../../schemas/host.schema')
const uuid = require('uuid');
const sshInstance = require('../../middlewares/sshExecuter.middleware')


async function getHosts()
{
    try
    {
        return await hostSchema.find({})
    } catch (e)
    {
        throw e;
        return;
    }
}

async function insertHost(host)
{
    try
    {
        console.log(host);
        let commands = []
        commands.push('dir')
        let response = yield  sshInstance.commandExecuter(host, commands)

        console.log(response);
        if (response == undefined)
        {
            console.log("Undefined passed");
            return "Server unreachable"
        }
        else
        {
            let newHost = new hostSchema
                ({
                    _id: uuid.v4(),
                    ip: host.ip,
                    login: host.login,
                    password: host.password,
                    connectionName: host.connectionName,
                })

            let result = await newHost.save()
            return result.username
        }

    } catch (e)
    {
        console.log(e);
        return "Error adding host"
    }
}

async function deleteHost(id)
{
    try
    {
        let result = await hostSchema.deleteOne({ _id: id })
        return result.deletedCount
    } catch (e)
    {
        console.log(e);
        throw e;
    }
}

module.exports = { getHosts, insertHost, deleteHost }
