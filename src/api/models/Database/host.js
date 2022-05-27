const hostSchema = require('../../schemas/host.schema')
const commandOutputSchema = require('../../schemas/commandOutput.schema')
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

async function updateHost(host)
{
    try
    {
        console.log("dzomei");
        const hostId = { _id: host._id }
        console.log(hostId);
        const update =
        {
            ip: host.ip,
            login: host.login,
            password: host.password,
            connectionName: host.connectionName
        }
        console.log(update);
        const target = await hostSchema.findOneAndUpdate(hostId,update)
        console.log(": " + target);

        return 1
    } catch (e)
    {
        console.log(e);
        return 0
    }
}

async function insertHost(host)
{
    try
    {
        // console.log(host);
        // let commands = []
        // commands.push('dir')
        // let response = yield  sshInstance.commandExecuter(host, commands)

        // console.log(response);

        let newHost = new hostSchema
            ({
                _id: uuid.v4(),
                ip: host.ip,
                login: host.login,
                password: host.password,
                connectionName: host.connectionName,
            })

        await newHost.save()
        return 1

    } catch (e)
    {
        console.log(e);
        return 0
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

async function insertCommandOutput(output)
{
    try
    {
        let outputInstance = new commandOutputSchema
            ({
                _id: uuid.v4(),
                commandOutput: output,

            })

        let result = await outputInstance.save()
        return await commandOutputSchema.find({})


    } catch (e)
    {
        console.log(e);
        return "Error adding host"
    }
}


module.exports = { getHosts, insertHost, deleteHost, insertCommandOutput, updateHost }
