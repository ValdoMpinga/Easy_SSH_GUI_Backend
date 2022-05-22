const hostSchemaInstance = require('../../models/Database/host')
const SSH2Shell = require('ssh2shell')

async function insertHost(host)
{
    return await hostSchemaInstance.insertHost(host)
}

async function getHosts()
{
    return await hostSchemaInstance.getHosts()
}

async function deleteHost(id)
{
    return await hostSchemaInstance.deleteHost(id)
}

module.exports = { insertHost, getHosts, deleteHost }
