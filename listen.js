//const app = require('./app')
//const port = 9000

//app.listen(port, () => {
 //   console.log(`app listening on http://localhost:${port}`)
//})

const app = require("./app.js")
const { PORT = 9000 } = process.env
const ENV = process.env.NODE_ENV

app.listen(PORT, () => console.log(`server running on ${ENV}`));