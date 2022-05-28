const SSH2Shell = require('ssh2shell')

const host =
{
    server:
    {
        host: "172.16.176.21",
        userName: "osboxes",
        password: "osboxes.org",
    },
    commands: ["mkdir checkDir", "dir", "ls -la"]
};

describe('ssh connection test', function ()
{
    describe('simple connection', function ()
    {
        SSH = new SSH2Shell(host),
            callback = function (sessionText)
            {
                console.log(sessionText)
            }

        SSH.connect(callback);
    });
});
