const port = 8675;

const server = require("./api/server.js");

server.listen(port, () => console.log(`\n server is listening on ${port} \n`))