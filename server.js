const jsonServer = require("json-server");
const auth = require("json-server-auth");
const ordersRouter = require("./orders");  // Import the orders route

const server = jsonServer.create();
const router = jsonServer.router("data/db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(auth);
server.use(jsonServer.bodyParser);

server.set("db", router.db);  // Make db accessible in other files
server.use(ordersRouter);     // Use the orders route

server.use(router);
server.listen(8000, () => {
  console.log("JSON Server is running on port 8000");
});
