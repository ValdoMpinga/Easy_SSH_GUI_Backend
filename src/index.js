require('dotenv').config();

const app = require('express')();

//routes

const directoryRouter = require('./api/routes/Directory/directory')
const connectionRouter = require('./api/routes/Connection/connections')
const fileRouter = require('./api/routes/File/file')
const keyRouter = require('./api/routes/Key/key')
const serverConfigRouter = require('./api/routes/ServerConfig/serverConfig')

const cors = require('cors')

app.use(cors())

app.listen
    (
        process.env.PORT, () => console.log(`server is listening!`)
    );

app.use('/directories', directoryRouter)
app.use('/files', fileRouter)
app.use('/connections', connectionRouter)
app.use('/keys', keyRouter)
app.use('/serverconfig', serverConfigRouter)


