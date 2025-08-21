import * as express from 'express';
import apiRouter from "./api";
import cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 8080;

app.use(
  cors({}),
  apiRouter
);

// Start the server and listen on the specified port
app.listen(port, () => {
  // Log a message when the server is successfully running
  console.log(`Server is running on http://localhost:${port}`);
});