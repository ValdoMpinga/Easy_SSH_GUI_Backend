const SSH2Shell = require('ssh2shell')

let bla = null
async function connector()
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

    SSH = new SSH2Shell(host),
        callback = async (text) =>
        {
            bla = await text
        }

    SSH.connect(await callback);

}

p = new Promise((resolve, reject) =>
{
    connector()
    if (bla == null)
        resolve(bla)
    else
        reject("Something went wrong")

})

p
    .then((response) => console.log(response))
    .catch(() => console.log(response))
