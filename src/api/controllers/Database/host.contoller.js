const hostSchemaInstance = require('../../models/Database/host')
const commandOutputSchema = require('../../models/Database/host')
const SSH2Shell = require('ssh2shell')

async function insertHost(host)
{
    return await hostSchemaInstance.insertHost(host)
}

async function updateHost(host)
{
    return await hostSchemaInstance.updateHost(host)
}

async function insertCommandOutput(output)
{
    return await commandOutputSchema.insertCommandOutput(output)
}

async function getHosts()
{
    return await hostSchemaInstance.getHosts()
}

async function deleteHost(id)
{
    return await hostSchemaInstance.deleteHost(id)
}

module.exports = { insertHost, getHosts, deleteHost, insertCommandOutput, updateHost }
