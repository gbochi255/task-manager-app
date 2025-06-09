//const app = require('./app')
//const port = 9000

//app.listen(port, () => {
 //   console.log(`app listening on http://localhost:${port}`)
//})
require('dotenv').config();
const app = require("./app.js")

const { PORT = 9000 } = process.env
const ENV = process.env.PGDATABASE

app.listen(PORT, () => console.log(`server running on ${ENV}`));